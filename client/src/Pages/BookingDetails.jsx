import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { json, useParams } from 'react-router-dom'
import { Box, Button, Container, Grid, Typography, Modal } from '@mui/material'
import { useSelector } from 'react-redux'
import {toast,Toaster} from 'react-hot-toast'
import BookedRoom from '../components/bookedRoom/BookedRoom'
import ShowHotel from '../components/ShowHotel'
import Navbar from '../components/navbar/Navbar'
import Header from '../components/header/Header'
import PaymentCompleted from '../components/PaymentCompleted'
import { bookingCancelUrl } from '../utils/APIRoutes'

function BookingDetails() {
  const [details, setDetails] = useState()
  const [room, setRoom] = useState()
  const [hotel, setHotel] = useState()
  const { id } = useParams()
  const bookings = useSelector(state => state?.booked?.details)

  useEffect(() => {
    getRoomDetails()
  }, [])


  const getRoomDetails = () => {
    const singleBookingDetails = bookings.find((booking) => {
      return JSON.stringify(booking._id) === JSON.stringify(id);
    });
    setHotel(singleBookingDetails?.hoteldetails)
    setDetails(singleBookingDetails)
    setRoom(singleBookingDetails?.roomDetails)
  }

  const handleCancel = async (orderId) => {
    const result = window.confirm('are you sure want to cancel booking ?')
    if(result == true){
      const data = await axios.post(`${bookingCancelUrl}/${orderId}`)
      if(data?.data?.status){
        toast.success(`${data?.data?.msg}`)
      }else{
        toast.error(`${data?.data?.msg}`)
      }
    }
  }



  return (
    <>
      <Navbar />
      <Header type='list' />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        {details?.status === "active" ? (
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: "primary" }}>Booking confirmed</Typography>
        ) : details?.status === "cancelled" ? (
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: "primary" }}>Booking cancelled</Typography>
        ) : details?.status === "completed" ? (
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: "primary" }}>Booking completed</Typography>
        ) : ""}
      </Box>
      <Box sx={{ marginTop: '5rem', marginLeft: { xs: '2rem', md: '5rem', lg: '5rem' }, marginRight: { xs: '2rem', md: '5rem', lg: '5rem' } }}>
        <Grid container spacing={5} alignItems="center" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <Grid item xs={12} md={6} lg={5}>
            <BookedRoom details={details} room={room} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <ShowHotel hotel={hotel} search={true} />
            {
              details && details?.status != 'cancelled' ? <PaymentCompleted hotel={hotel} order={details?._id} /> : ''
            }
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', marginTop: { lg: '4rem' } }}>
              {
                details && details?.status == 'active' ? (
                  <>
                    <Typography >do you want to cancel your booking?</Typography>
                    <Button variant='contained' color='error' onClick={() => handleCancel(details?._id)}>cancel</Button>
                  </>
                ) : details?.status == 'cancelled' ? (
                  <Typography style={{ backgroundColor: "lightblue" }} sx={{padding:'10px'}}>
                    {`₹${details?.total} will be refunded to your account with 5 working days`}
                  </Typography>

                ) : ""
              }

            </Box>
          </Grid>

        </Grid>
        <Toaster position="top-center" reverseOrder={false} />
      </Box>

    </>
  )
}

export default BookingDetails