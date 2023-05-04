import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { PersonOutline } from '@material-ui/icons';
import BedIcon from '@material-ui/icons/Hotel';
import MailIcon from '@material-ui/icons/Mail';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getBookingDetails, getRoomCmpltURL } from '../../utils/APIRoutes';



function BookedRoom() {
    const details = useSelector(state => state?.booking?.details)
    const user = useSelector(state => state.user.user)
    const [hotel, setHotel] = useState()
    const [bookingData,setBookingData] = useState();
    const [room, setRoom] = useState()
    const checkInDate = new Date(details?.checkInDate).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    const checkOutDate = new Date(details?.checkOutDate).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((new Date(checkInDate) - new Date(checkOutDate))) / oneDay);
    

    useEffect(() => {
        getCmpltRoomDtls()
        getBookingData()
    }, [])

    const getCmpltRoomDtls = async () => {
        const fetchedDetails = await axios.get(`${getRoomCmpltURL}/${details?.hotel}`)
        setHotel(fetchedDetails?.data)
    }

    useEffect(() => {
        const roomdata = hotel?.rooms.find((room) => room._id == details.room)
        setRoom(roomdata)
    }, [hotel])

  

    const getBookingData = async()=>{
        const booking = await axios.get(`${getBookingDetails}/${details._id}`)
        setBookingData(booking?.data)
    }

    console.log(bookingData)
    return (
        <>
        <Grid sx={{ border: "solid 1px #d4cecd", boxShadow: 10 }}>
                <Container marginBottom={5} sx={{ gap: "10px" }}>
                    <h1 className='bookingDetails'>Your booking details</h1>
                    <img src={room ? room?.images[0] : ""} alt="" className='RoomImg' />
                    <Container sx={{ display: 'flex' }} gap={5}>
                        <Container sx={{ border: "solid 1px #d4cecd", boxShadow: 7, display: 'flex', flexDirection: 'column', gap: "5px", borderRadius: 2, marginRight: 2, fontSize: "12px", fontWeight: 500, height: "5rem", paddingTop: 1, paddingBottom: 2, marginBottom: 3 }}>
                            <span>check-in</span>
                            <span>{checkInDate}</span>
                            <span>From 12:00</span>
                        </Container>
                        <Container sx={{ border: "solid 1px #d4cecd", boxShadow: 7, display: 'flex', flexDirection: 'column', gap: "5px", borderRadius: 2, fontSize: "12px", fontWeight: 500, height: "5rem", paddingTop: 1, paddingBottom: 2, marginBottom: 3 }}>
                            <span>check-out</span>
                            <span>{checkOutDate}</span>
                            <span>To 2:00</span>
                        </Container>
                    </Container>
                    <Box component="span" sx={{ color: "#22779c", fontSize: "14px", fontWeight: "500", gap: "20px" }}>{`Total length of stay: ${diffDays} day`}</Box>
                </Container>
                <Container sx={{ display: 'flex', flexDirection: 'column', marginBottom: 3,gap:'10px' }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>{`Room Type: ${room && room?.roomType}`}</Typography>
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <Typography sx={{ fontSize: "14px" }}>No of the guests</Typography>
                            <PersonOutline />
                            <Typography sx={{ fontSize: "14px" }}>{bookingData&& bookingData?.guests-1}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <Typography sx={{ fontSize: "14px" }}>Rooms</Typography>
                            <BedIcon />
                            <Typography sx={{ fontSize: "14px" }}>{bookingData && bookingData.numberOfRooms}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '5px' }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>{`Price: ₹ ${bookingData && bookingData?.total} `}</Typography>
                        <Typography sx={{ color: 'text.disabled' }}>( 12% gst included)</Typography>
                    </Box>

                    {
                        bookingData?.bookedBy ? (<>
                         <Box sx={{ width: '100%', padding: '15px', backgroundColor: '#DBDFEA', borderRadius: '5px' }}>
                        <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>Booked by:</Typography>
                        <Box sx={{ display: 'flex', gap: '15px' }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>{bookingData?.bookedBy.name}</Typography>
                            <Box sx={{display:'flex',gap:'10px'}}>
                                <MailIcon />
                                <Typography sx={{ fontSize: "14px" }}>{bookingData?.bookedBy.email}</Typography>
                            </Box>
                           
                        </Box>
                        {/* <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>Guets </Typography> */}
                    </Box>
                        </>) : ''
                    }
                   
                    <Link >change your selection</Link>
                </Container>

            </Grid>
        </>
    )
}

export default BookedRoom