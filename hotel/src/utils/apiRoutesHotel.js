const host = 'https://api.bookmytrip.site/api/hotel'


const hotelLoginUrl = `${host}/login`
const hotelRegister = `${host}/register`
const hotelInfoSubmit= `${host}/info/submit`
const forgotPasswordUrl = `${host}/forgot/password`
const passwordResetUrl =`${host}/reset/password`
const SignInWithOtpUrl = `${host}/sign-in/otp`
const otpverifyUrl = `${host}/get/otp`
const getDataUrl = `${host}/get/data`
const hotelRoomDetailsSubmit= `${host}/submit/room`
const getRoomDetailsUrl =`${host}/get/roomdata`
const deleteRoomUrl =`${host}/delete/room`
const roomEditUrl = `${host}/edit/room`
const hotelRoomEditSubmit = `${host}/edit/submit`
const deleteHotelUrl = `${host}/delete/hotel`
const deletePhotoUrl = `${host}/delete/photo`
const deleteRoomImage =`${host}/delete/room/image`
const getHotelWiseBookingUrl = `${host}/get/booking`
const getAllBookings =`${host}/get/all/bookings`
const getDayWiseDetails = `${host}/get/day/wise`
export {getDayWiseDetails,getAllBookings,getHotelWiseBookingUrl,deleteRoomImage,deletePhotoUrl,hotelRoomEditSubmit,deleteHotelUrl,roomEditUrl,hotelLoginUrl,deleteRoomUrl,hotelRoomDetailsSubmit,getRoomDetailsUrl,hotelRegister,hotelInfoSubmit,forgotPasswordUrl,getDataUrl,passwordResetUrl,SignInWithOtpUrl,otpverifyUrl}