const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    hotel:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    checkInDate:{
        type:Date,
        required:true
    },
    checkOutDate:{
        type:Date,
        required:true
    },
    days:{
        type:Number,
    },
    numberOfRooms:{
        type:Number
    },
    total:{
        type:Number,
    },
    displayPrice:{
        type:Number
    },
    discountedPrice:{
        type:Number
    },
    walletBalance:{
        type:Number
    },
    guests:{
        type:Number,
    },
    guestDetails:{
        type:Array
    },
    bookedBy:{
        type:Object
    },
    totalPrice:{
        type:Number,
    },
    status:{
        type:String,
        enum:['pending','confirmed','cancelled','completed'],
        default:'pending'
    },
    options:{
        type:Object,
    }
})

module.exports = mongoose.model('Booking',bookingSchema)




