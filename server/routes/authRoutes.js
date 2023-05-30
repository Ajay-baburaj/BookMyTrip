const router = require('express').Router()
const {register,bookRoom, login, forgotPassword,resetPassword, validateMobile,otpSignIn,getHotels,getHotelImages,getSingleHotelData, countByCity, confirmBooking, verifyPayment, getBooking, retainHotelRoom, getUserWiseBooking, cancelBooking, updateBookedBy, payUsingWallet, searchCities, setReviewNotification, validateUserForReview, writeReview, addGuestDetails, deleteGuest, deleteReview, getHotelsByRating, getReviewForEdit} = require("../controllers/userController")
const {retainRoomCountMiddleware} = require('../middlewares/roomCount')
const { verifyUser } = require('../middlewares/verifyUser')
const secret = process.env.USER_SECRER_KEY


router.post("/register",retainRoomCountMiddleware,register)
router.post("/login",retainRoomCountMiddleware,login)
router.post("/forgot/password",forgotPassword)
router.post("/reset/password/:id/:token",resetPassword)
router.post("/validate/mobile",validateMobile)
router.post("/send/otp",otpSignIn)
router.get("/hotels",retainRoomCountMiddleware,getHotels)
router.get("/get/images",getHotelImages)
router.get('/get/details/:id',retainRoomCountMiddleware,getSingleHotelData)
router.get('/countByCity',retainRoomCountMiddleware,countByCity)
router.post('/book/room',retainRoomCountMiddleware,verifyUser(secret),bookRoom)
router.post('/confirm/booking/:id',retainRoomCountMiddleware,verifyUser(secret),confirmBooking)
router.get('/get/booking/:id',retainRoomCountMiddleware,verifyUser(secret),getBooking)
router.post ('/payment/success',retainRoomCountMiddleware,verifyUser(secret),verifyPayment)
router.get('/room/count/:id',retainRoomCountMiddleware,retainHotelRoom)
router.get('/user/booking/:id',retainRoomCountMiddleware,verifyUser(secret),getUserWiseBooking)
router.post('/cancel/booking/:id',retainRoomCountMiddleware,verifyUser(secret),cancelBooking)
router.put('/add/bookedby/:id',verifyUser(secret),updateBookedBy)
router.put('/pay/using/wallet/:id',verifyUser(secret),payUsingWallet)
router.get('/search/cities',retainRoomCountMiddleware,searchCities)
router.post('/validate/user/review',retainRoomCountMiddleware,verifyUser(secret),validateUserForReview)
router.post('/write/review',retainRoomCountMiddleware,verifyUser(secret),writeReview)
router.post('/add/guest/:id',verifyUser(secret),addGuestDetails)
router.delete('/delete/guest',verifyUser(secret),deleteGuest)
router.delete('/delete/review',verifyUser(secret),deleteReview)
router.get('/hotel/by/rating',getHotelsByRating)
router.get('/get/review/:id',getReviewForEdit)
module.exports = router;