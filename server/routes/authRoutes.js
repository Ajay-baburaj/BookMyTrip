const router = require('express').Router()
const {register,bookRoom, login, forgotPassword,resetPassword, validateMobile,otpSignIn,getHotels,getHotelImages,getSingleHotelData, countByCity, confirmBooking, verifyPayment, getBooking, retainHotelRoom} = require("../controllers/userController")

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
router.post('/confirm/booking/:id',confirmBooking)
router.get('/get/booking/:id',getBooking)
router.post ('/payment/success',verifyPayment)
router.get('/room/count/:id',retainHotelRoom)

module.exports = router;