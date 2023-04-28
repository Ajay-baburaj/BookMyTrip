const router = require('express').Router()
const {register,bookRoom, login, forgotPassword,resetPassword, validateMobile,otpSignIn,getHotels,getHotelImages,getSingleHotelData, countByCity} = require("../controllers/userController")

router.post("/register",register)
router.post("/login",login)
router.post("/forgot/password",forgotPassword)
router.post("/reset/password/:id/:token",resetPassword)
router.post("/validate/mobile",validateMobile)
router.post("/send/otp",otpSignIn)
router.get("/hotels",getHotels)
router.get("/get/images",getHotelImages)
router.get('/get/details/:id',getSingleHotelData)
router.get('/countByCity',countByCity)
router.post('/book/room',bookRoom)

module.exports = router;