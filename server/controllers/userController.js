const bcrypt = require('bcrypt')
const users = require("../model/userModel")
const jwt = require('jsonwebtoken')
const { emailsender } = require("../helper/nodemailer")
const { sendOtp, verifyOtp } = require('../helper/twilio')
const hotelModel = require('../model/hotelModel')
const { default: mongoose } = require('mongoose')
const { getFromS3 } = require('../helper/s3Bucket')
const { getWholeImagesOfHotel } = require('../helper/loginChecker')
const bookingModel = require('../model/bookingModel')
const Razorpay = require('razorpay')
const moment = require('moment')
const { instance, generateRazorpay, verifyPayment } = require('../helper/razorpay')
const { getFormattedDate } = require('../helper/dateFormat')
const { UserChannelInstance } = require('twilio/lib/rest/chat/v1/service/user/userChannel')




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
        const userCheck = await users.findOne({ email })
        console.log(userCheck)
        if (userCheck.status) {
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
        } else {
            res.json({ inValidMail: true, status: false, msg: "Account is blocked" })
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
            const hotels = await hotelModel.aggregate([
                {
                    $match: {
                        status: true,
                        isRegistered: true,
                        isBlocked: false,
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
        const getCompeleteDtls = await getWholeImagesOfHotel(details)
        res.status(201).json(getCompeleteDtls)
    } catch (err) {
        console.log(err.message)
    }
}

module.exports.countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return hotelModel.countDocuments({ city: city, isRegistered: true, status: true, isBlocked: false });
            })
        )
        res.status(200).json(list)
    } catch (err) {
        console.log(err)
    }
}

module.exports.countByType = async (req, res, next) => {
    try {
        const hotelCount = await hotelModel.countDocuments({ type: "hotel" })
        const apartmentCount = await hotelModel.countDocuments({ type: "hotel" })
        const resortCount = await hotelModel.countDocuments({ type: "hotel" })
        const villaCount = await hotelModel.countDocuments({ type: "hotel" })

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount }
        ])

    } catch (err) {
        console.log(err)
    }
}

module.exports.bookRoom = async (req, res, next) => {
    try {

        const { userId, roomId, hotelId, date, destination, options } = req.body
        console.log(req.body)

        const checkInDate = new Date(date[0]?.startDate)
        const checkOutDate = new Date(date[0]?.endDate)
        const oneDay = 24 * 60 * 60 * 1000;
        const dateOptions = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }
        const formattedCheckIn = checkInDate.toLocaleDateString('en-Us', dateOptions)
        const formattedCheckOut = checkInDate.toLocaleDateString('en-Us', dateOptions)
        const diffDays = Math.round(Math.abs(checkInDate - checkOutDate) / oneDay)
        const hotel = await hotelModel.findById({ _id: hotelId })
        const roomdata = hotel?.rooms.find((room) => room._id == roomId)
        const total = parseInt(options?.room) * parseInt(diffDays) * parseInt(roomdata.price)
        const tax = total * 0.12
        const grandTotal = total + tax

        const bookingData = await bookingModel.create({
            user: userId,
            room: roomId,
            hotel: hotelId,
            numberOfRooms: options?.room,
            checkInDate,
            checkOutDate,
            days: diffDays,
            total: grandTotal,
            guests: options?.adult + options?.children,
            options
        })
        res.status(200).json(bookingData)
    } catch (err) {
        console.log(err.message)
    }
}

module.exports.payUsingWallet = async (req, res, next) => {
    try {
        const bookingId = req.params.id
        const booking = await bookingModel.findById(bookingId)
        const user = await users.findById(booking?.user)
        let discountedPrice = 0;
        let walletBalance = 0;
        let displayPrice = 0;
        if (user.wallet > booking.total) {
            discountedPrice = booking.total
            displayPrice = discountedPrice - booking.total
            walletBalance = user.wallet - booking.total
        } else if (user.wallet <= booking.total && user.wallet > 0) {
            discountedPrice = user.wallet
            displayPrice = Math.round(booking?.total - discountedPrice)
            walletBalance = 0
        }

        await bookingModel.findByIdAndUpdate(bookingId, {
            discountedPrice,
            displayPrice,
            walletBalance,

        })
        const data = await users.findByIdAndUpdate(booking.user, { wallet: walletBalance }, { new: true }).select({
            _id: 1, email: 1, phone: 1, status: 1, wallet: 1, username: 1
        })
        res.status(200).json(data)

    } catch (err) {
        console.log(err)
    }
}



module.exports.confirmBooking = async (req, res, next) => {
    try {
        const bookingId = req.params.id
        const details = await bookingModel.findById(bookingId)
        if (details.displayPrice == 0) {
                const booking = await bookingModel.findByIdAndUpdate(
                    bookingId,
                    { status: "active" },
                    { new: true }
                );
                const checKInDate = moment(booking?.checkInDate);
                const checKOutDate = moment(booking?.checkOutDate);
                const duration = moment.duration(checKOutDate.diff(checKInDate)).asDays();
                const singleDigit = Math.round(duration);
                const roomsToSubtract = booking?.numberOfRooms;

                const hotel = await hotelModel
                    .findByIdAndUpdate(
                        booking?.hotel,
                        {
                            $inc: {
                                ["rooms.$[room].numberOfRooms"]: -roomsToSubtract,
                            },
                        },
                        {
                            arrayFilters: [
                                {
                                    "room._id": booking?.room,
                                },
                            ],
                            new: true,
                        }
                    )
                    .exec();
            res.status(200).json({ paymentStatus: true })
        } else {
            console.log(details)
            const result = await generateRazorpay(bookingId, details.displayPrice ? details.displayPrice :details.total)
            res.status(200).json(result)
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.getBooking = async (req, res, next) => {
    try {
        const bookingId = req.params.id
        console.log("req", req.params.id)
        const booking = await bookingModel.findById({ _id: bookingId })
        res.status(200).json(booking)
    } catch (err) {
        console.log(err.message)
    }
}

module.exports.verifyPayment = async (req, res) => {
    try {
        console.log("verify", req.body);
        await verifyPayment(req.body).then(async (response) => {
            if (response.status) {
                const bookingId = req.body?.bookingId;
                const booking = await bookingModel.findByIdAndUpdate(
                    bookingId,
                    { status: "active" },
                    { new: true }
                );
                const checKInDate = moment(booking?.checkInDate);
                const checKOutDate = moment(booking?.checkOutDate);
                const duration = moment.duration(checKOutDate.diff(checKInDate)).asDays();
                const singleDigit = Math.round(duration);
                const roomsToSubtract = booking?.numberOfRooms;

                const hotel = await hotelModel
                    .findByIdAndUpdate(
                        booking?.hotel,
                        {
                            $inc: {
                                ["rooms.$[room].numberOfRooms"]: -roomsToSubtract,
                            },
                        },
                        {
                            arrayFilters: [
                                {
                                    "room._id": booking?.room,
                                },
                            ],
                            new: true,
                        }
                    )
                    .exec();
                res.status(200).json(hotel)
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports.retainHotelRoom = async (req, res, next) => {
    try {
        const roomToRetain = await bookingModel.find({ hotel: new mongoose.Types.ObjectId(req.params.id) });
        const edited = roomToRetain.filter(async (room, index) => {
            const chekDate = new Date(room.checkOutDate);
            const currentDate = new Date();
            const dateString = chekDate.toISOString().substring(0, 10);
            const currentDateStr = currentDate.toISOString().substring(0, 10);
            if (new Date(dateString) > new Date(currentDateStr)) {
                return room.room;
            }
        });
        res.status(200).send(edited);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports.getUserWiseBooking = async (req, res, next) => {
    try {
        const userId = req.params.id
        const bookings = await bookingModel.find({ user: userId, status: { $ne: 'pending' } });

        const bookingDetails = await Promise.all(bookings.map(async (booking) => {
            const checkInDate = await getFormattedDate(booking.checkInDate)
            const checkOutDate = await getFormattedDate(booking.checkOutDate)
            const hotelData = await hotelModel.findById(booking.hotel)
            const completeHotel = await getWholeImagesOfHotel(hotelData)
            const roomdata = completeHotel.rooms.find((room) => {
                return JSON.stringify(room._id) === JSON.stringify(booking.room);
            })


            if (new Date(checkOutDate) < new Date()) {
                booking.status = 'completed'
                await booking.save()
            }

            return {
                ...booking.toJSON(),
                checkInDate,
                checkOutDate,
                hoteldetails: completeHotel,
                roomDetails: roomdata
            }
        }))

        res.status(200).json(bookingDetails)
    } catch (err) {
        console.log(err.message)
    }
}

module.exports.cancelBooking = async (req, res, next) => {
    try {

        const bookingId = req.params.id
        console.log(bookingId)
        const check = await bookingModel.findById(bookingId)
        console.log(check.checkInDate)
        const current = new Date()
        const checkIn = moment(check.checkInDate)
        const currentDate = moment(current)
        console.log(currentDate)
        console.log(checkIn)
        const duration = moment.duration(checkIn.diff(currentDate)).asDays();
        const singleDigit = Math.round(duration);
        console.log("singleDigit",singleDigit)

        if (Math.abs(singleDigit) > 0) {
            const booking = await bookingModel.findByIdAndUpdate(bookingId, { status: 'cancelled' })
            const countIncrease = booking?.numberOfRooms
            const roomId = booking?.room
            const hotelId = booking?.hotel
            await users.findByIdAndUpdate(booking?.user, { $inc: { wallet: booking?.total } })
            await hotelModel.updateOne(
                { _id: hotelId, "rooms._id": roomId },
                { $inc: { "rooms.$.numberOfRooms": countIncrease } }
            )
                .then((response) => {
                    res.status(200).json({ status: true, msg: 'cancelled successfully' })
                })
        } else {
            res.status(200).json({ status: false, msg: 'you can only cancel room before check-in date' })
        }

    } catch (err) {
        console.log(err.message)
    }
}



module.exports.updateBookedBy = async (req, res, next) => {
    try {
        const bookingId = req.params.id
        const name = req.body?.data?.firstName + " " + req.body?.data?.lastName
        const bookedBy = {
            name,
            email: req.body.data.email,
            phone: req.body.data.phone
        }
        const updateModel = await bookingModel.findByIdAndUpdate(bookingId, { bookedBy })
        res.status(200).json(updateModel)
    } catch (err) {
        console.log(err.message)
    }
}

module.exports.searchCities = async(req,res,next)=>{
    try{
     let regexPattern = new RegExp("^" + req.query.city, "i");
     const data = await hotelModel.find({city:{$regex:regexPattern}})

     const citiesSet = new Set();
     data.forEach((hotel) => {
       citiesSet.add(hotel.city);
     });
 
     const city = Array.from(citiesSet);
     res.status(200).json(city)
    }catch(err){
        console.log(err.message)
    }
}


module.exports.reviewHotel = async(req,res,next)=>{
    console.log(req.body.id)
    const bookingId = req.params.booking
    const userId = req.params.user
    const booking = bookingModel.findById(bookingId)
    if(userId == booking.user && booking.status == 'completed'){
        //eligible for review
        
    }else{
        res.status(400).json({message:'you cannot add review with out booking'})
    }
}














