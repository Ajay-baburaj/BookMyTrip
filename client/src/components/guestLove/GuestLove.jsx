import React, { useState ,useEffect} from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import "./styles.css";
import axios from 'axios'
import "./guestLove.css"
import { getRatingWiseHotelUrl } from '../../utils/APIRoutes'
import { useNavigate } from 'react-router-dom'


function GuestLove() {
   
   const navigate = useNavigate()
   const [datas, setDatas] = useState([])
   const [active, setaAtive] = useState(0);
   useEffect(() => {
      getDatas()
   }, [])

   const getDatas = async () => {
      const { data } = await axios.get(getRatingWiseHotelUrl)
      setDatas(data)
   }
   const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

   console.log(datas)
   return (
      <div className='guestLove'>
         <Slider {...settings}>
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
         </Slider>
         
      </div>
   )
}

export default GuestLove