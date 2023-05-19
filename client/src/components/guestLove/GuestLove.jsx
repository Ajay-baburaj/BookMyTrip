import React from 'react'
import "./guestLove.css"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getRatingWiseHotelUrl } from '../../utils/APIRoutes'
import { Box, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'


function GuestLove() {
   const navigate = useNavigate()
   const [datas, setDatas] = useState([])
   useEffect(() => {
      getDatas()
   }, [])

   const getDatas = async () => {
      const { data } = await axios.get(getRatingWiseHotelUrl)
      setDatas(data)
   }

   console.log(datas)
   return (
      <div className='guestLove'>
         {
            datas && datas?.map((hotel, index) => (
               <div className="guestLoveContainer" onClick={()=>navigate(`/hotels/${hotel?._id}`)} style={{cursor:"pointer"}}>
                  <img src={hotel?.hotelImage[0]} alt="" className="glistImg" />
                  <span className='glHotelName'>{hotel?.name} </span>
                  <span className='glCity'>{hotel?.city}</span>
                  <div className="glRating">
                     <button className="glButton">{hotel?.rating}</button>
                     <span className="glReview">{hotel?.rating && hotel.rating > 8 ? "Excellent" : hotel?.rating && hotel.rating > 6 ? "Good" : "Average"}</span>
                  </div>
               </div>
            ))
         }
      </div>
   )
}

export default GuestLove