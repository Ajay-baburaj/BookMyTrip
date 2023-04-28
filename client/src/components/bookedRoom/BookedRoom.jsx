import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import SearchItem from '../../components/searchItem/SearchItem'


function BookedRoom(props) {
    const { details, room } = props
    const checkInDate = new Date(details?.checkInDate).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    const checkOutDate = new Date(details?.checkOutDate).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((new Date(checkInDate) - new Date(checkOutDate))) / oneDay);
    console.log(details?.checkInDate)


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
                <Container sx={{ display: 'flex', flexDirection: 'column', marginBottom: 3 }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>{`Room Type: ${room && room?.roomType}`}</Typography>
                    <Box sx={{display:'flex',gap:'5px'}}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>{`Price: ₹ ${room && parseInt(room?.price)*parseInt(diffDays)} `}</Typography>
                        <Typography sx={{ color: 'text.disabled' }}>+ gst</Typography>
                    </Box>
                    <Link >change your selection</Link>
                </Container>

            </Grid>
        </>
    )
}

export default BookedRoom