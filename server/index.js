const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');

const redisClient = require('ioredis');
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const hotelRoutes = require('./routes/hotelRoutes')
const cookieParser = require("cookie-parser")
require('dotenv').config();
const redis = new redisClient();
const app = express()

app.use(cors({
    origin: ['http://localhost:3000','http://localhost:3001'],
    credentials: true
}));



app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("database connect succesfully")
}).catch(() => {
    console.log(err.message)
})


// redis.on('error', err => console.log('Redis Client Error', err));
// redis.connect().then(() => {
//     console.log("Redis connected successfully")
// }).catch((err) => {
//     console.log(err)
// })


// if (redis.status === 'connecting' || redis.status === 'connected') {
//     console.log('Redis already connected');
//   } else {
//     redis.connect().then(() => {
//       console.log("Redis connected successfully")
//     }).catch((err) => {
//       console.log(err)
//     })
  // }
  

app.use('/', authRoutes)
app.use('/admin', adminRoutes)
app.use('/hotel', hotelRoutes)



const server = app.listen(process.env.PORT, () => {
    console.log(`server started at port${process.env.PORT}`)
})

