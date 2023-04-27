const bcrypt = require('bcrypt')
const users = require("../model/userModel")
const jwt = require('jsonwebtoken')
const { emailsender } = require("../helper/nodemailer")
const { sendOtp, verifyOtp } = require('../helper/twilio')
const hotelModel = require('../model/hotelModel')
const { default: mongoose } = require('mongoose')
const { getFromS3 } = require('../helper/s3Bucket')
const { getWholeImagesOfHotel } = require('../helper/loginChecker')


module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password, phone } = req.body;
        console.log(typeof (phone));
        const userNameCheck = await users.findOne({ username })
        if (userNameCheck) {
            return res.json({ msg: "username already exists", status: false })
        }
        const emailCheck = await users.findOne({ email })
        if (emailCheck) {
            return res.json({ msg: "email already exists", status: false })
        }
        const phoneCheck = await users.findOne({ phone })
        if (phoneCheck) {
            return res.json({ msg: "phone number already exists", status: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await users.create({
            email,
            username,
            phone,
            password: hashedPassword
        })
        delete user.password;
        return res.json({ status: true, user })

    } catch (err) {
        next(err)
    }
}

const generateAccesToken = (user) => {
    return jwt.sign({ id: user.id, uername: user.username }, "yoitsSecret", {
        expiresIn: "10m"
    })
}

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, "yoItsRefreshToken", { expiresIn: "10m" })
}
module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const userCheck = await users.findOne({ email})
        console.log(userCheck)
        if(userCheck.status){
            console.log(userCheck)
            if (!userCheck) {
                return res.json({ inValidMail: true, msg: "invalid email", status: false })
            }
            const isPasswordValid = await bcrypt.compare(password, userCheck.password)
            console.log(isPasswordValid)
            if (!isPasswordValid) {
                return res.json({ inValidPassword: true, msg: "incorrect password", status: false })
            }
            if (isPasswordValid && userCheck) {
                delete userCheck.password
                const accesToken = generateAccesToken(userCheck)
                const refreshToken = generateRefreshToken(userCheck)
                refreshTokens.push(refreshToken)
                return res.json({
                    msg: "loggin succesfull",
                    status: true,
                    userCheck, accesToken
                })
            }
        }else{
            res.json({inValidMail:true,status:false,msg:"Account is blocked"})
        }
       

    } catch (err) {
        console.log(err.message)
        next(err)
    }

}

let refreshTokens = []

module.exports.refreshToken = async (req, res) => {

    //take token from userSide
    const refreshToken = req.body.token
    //send error if there is no refreshToken
    if (!refreshToken) {
        return res.json.status(401).json('you are no authorized')
    }
}

const JWT_SECRET = "yoItsDamnSecret"

module.exports.forgotPassword = async (req, res, next) => {
    const { forgotEmail } = req.body
    const userExist = await users.findOne({ email: forgotEmail })
    if (userExist) {
        const secret = JWT_SECRET + userExist.password;
        const payload = {
            email: userExist.email,
            _id: userExist._id,
        }
        console.log(payload)
        const token = jwt.sign(payload, secret)
        const link = `http://localhost:3000/reset/password/${userExist._id}/${token}`
        let result = emailsender(userExist.email, link)
        res.json({ status: true })
    } else {
        res.json({ status: false })
        return false;
    }

}

module.exports.resetPassword = async (req, res, next) => {
    const { id, token, password } = req.body;
    const userCheck = await users.findById(id)
    if (userCheck) {
        const secret = JWT_SECRET + userCheck.password
        try {
            jwt.verify(token, secret, async (err, payload) => {
                if (err) {
                    res.json({ status: false, msg: err.message })
                } else {
                    const hashedPassword = await bcrypt.hash(password, 10)
                    await users.updateOne({ email: payload.email }, { password: hashedPassword })
                    res.json({ status: true, msg: "password reset successfull" })
                }
            })

        } catch (error) {
            console.log(error.message)
        }

    }

}

module.exports.validateMobile = async (req, res, next) => {
    const { mobileForOtp } = req.body
    console.log(mobileForOtp)
    try {
        const mobileCheck = await users.findOne({ phone: mobileForOtp })
        console.log(mobileCheck.phone)
        if (mobileForOtp == mobileCheck.phone) {
            sendOtp(mobileCheck.phone)
            const mobile = mobileCheck.phone
            return res.json({ status: true, msg: "mobile number verified", mobile })
        }
    } catch (err) {
        console.log(err)
        next(err)
    }

}


module.exports.otpSignIn = async (req, res, next) => {
    const { mobile, otp } = req.body
    try {
        const userFind = await users.findOne({ phone: mobile })
        verifyOtp(otp, mobile).then((response) => {
            if (response.status) {
                res.json({ status: true, msg: response.msg, user: userFind })
            }
        }).catch((err) => {
            res.json({ status: false, msg: "Invalid otp" })
        })
    } catch (err) {
        next(err)

    }
}

module.exports.getHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    console.log(others)
  
    try {
        if (min != 0 && max != 0) {
            console.log('call is coming here')
            const hotels = await hotelModel.aggregate([
                {
                  $match: {
                    status: true,
                    isRegistered: true,
                    isBlocked:false,
                    ...others,
                  },
                },
                {
                  $match: {
                    rooms: {
                      $elemMatch: {
                        price: { $gte: parseInt(min), $lte: parseInt(min) },
                      },
                    },
                  },
                },
              ]);
              
                console.log(hotels)
            res.status(200).json(hotels)
            
        } else {
            const hotels = await hotelModel.find({
                status: true,
                isRegistered: true,
                isBlocked: false,
                ...others,
            });
            res.status(200).json(hotels)
        }

    } catch (err) {
        console.log(err)
    }
}

module.exports.getHotelImages = async (req, res, next) => {
    console.log(req.query.id)
    const hotelData = await hotelModel.findOne({ _id: new mongoose.Types.ObjectId(req.query.id) })
    function hotelImages(hotelData) {
        return new Promise((resolve, reject) => {
            const promises = []
            const hotelPromises = hotelData?.hotelImage.map((img, idx) => {
                return getFromS3(img).then((resultUrl) => {
                    hotelData.hotelImage[idx] = resultUrl
                })
            })

            promises.push(Promise.all(hotelPromises))

            Promise.all(promises)
                .then(() => {
                    resolve(hotelData)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    await hotelImages(hotelData)
    res.status(200).json({ hotelData })
}

module.exports.getSingleHotelData = async (req, res, next) => {
    try {
        const details = await hotelModel.findById(req.params.id)
        console.log("details", details)
        const getCompeleteDtls = await getWholeImagesOfHotel(details)
        console.log(getCompeleteDtls)
        res.status(201).json(getCompeleteDtls)
    } catch (err) {
        console.log(err.message)
    }
}

module.exports.countByCity = async(req,res,next)=>{
    console.log("call is coming")
    const cities = req.query.cities.split(",");
    try{
        const list = await Promise.all(
            cities.map((city)=>{
                return hotelModel.countDocuments({city:city,isRegistered:true,status:true,isBlocked:false});
            })
        )
        res.status(200).json(list)
    }catch(err){
        console.log(err)
    }
}

module.exports.countByType = async(req,res,next)=>{
    try{
        const hotelCount = await hotelModel.countDocuments({type:"hotel"})
        const apartmentCount = await hotelModel.countDocuments({type:"hotel"})
        const resortCount = await hotelModel.countDocuments({type:"hotel"})
        const villaCount = await hotelModel.countDocuments({type:"hotel"})
        
        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"apartment",count:apartmentCount},
            {type:"resort",count:resortCount},
            {type:"villa",count:villaCount}
        ])

    }catch(err){
        console.log(err)
    }
}

