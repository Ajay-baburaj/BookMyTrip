import React from 'react'
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { blockHotelUrl } from '../utils/ApiRoutesAdmin';
import { useState,useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {toast,Toaster} from 'react-hot-toast'


export const HotelCard = ({ hotel,callback,openfn,closefn,getIdCallback}) => {
  
  const[status,setStatus] = useState(false)
    const[block,setBlock] = useState(false)
    const [cookies,setCookie,removeCookie] = useCookies()
    const handleBlock = async (id)=>{
        axios.put(`${blockHotelUrl}/${id}`,{},{
          headers:{
              withCredentials:true,
              "Authorization":`Bearer ${cookies?.jwt}`
          }
      }).then((response)=>{
        console.log(response.data)
          setStatus(response.data.currentStatus.block)
           
           }).catch((err)=>{
            alert(err.message)
        })
    }

    useEffect(()=>{
        status ? setBlock(true): setBlock(false)
    },[status])

  const navigate = useNavigate()
  return (
    <Card>
      <CardMedia
        sx={{ objectFit: 'cover', width: '244px', backgroundColor: 'rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.5s ease-in-out'}} 
        component="img"
        height="244"
        image={hotel?.hotelImage[0]}
        alt="hotelImg"
        loading='lazy'
      />
      <CardContent>
        <Typography sx={{ cursor: "pointer" ,fontWeight:'bolder'}} onClick={() => navigate("")} >
          {hotel.name}
        </Typography>
        <Typography marginTop={1} fontSize={14}>
          {hotel.city} 
        </Typography>
        <Box sx={{display:"flex" ,gap:"10px" ,paddingTop:"12px"}}>
            <Button variant='outlined' color='success' onClick={
              ()=>{
                openfn()
                getIdCallback(hotel._id)
              }}>View</Button>
            <Button variant='outlined' color='error' onClick={()=>{
              handleBlock(hotel._id)
              callback()
            }}>{hotel?.isBlocked ? "unblock": "Block"}</Button>
        </Box>
      </CardContent>
      <Toaster position="top-center" reverseOrder={false}
/>
    </Card>
    
  )
}






