import React from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import SearchItem from '../../components/searchItem/SearchItem'


function BookedRoom(data) {
    
  return (
    <>
       <Grid sx={{ border: "solid 1px #d4cecd", boxShadow: 10 }}>
                            <Container marginBottom={5} sx={{ gap: "10px" }}>
                                <h1 className='bookingDetails'>Your booking details</h1>
                                <img src="https://cache.marriott.com/is/image/marriotts7prod/lc-vieil-king-classic-guest-15214-58777:Classic-Hor?interpolation=progressive-bilinear&downsize=378px:*" alt="" className='RoomImg' />
                                <Container sx={{ display: 'flex' }} gap={5}>
                                    <Container sx={{ border: "solid 1px #d4cecd", boxShadow: 7, display: 'flex', flexDirection: 'column', gap: "5px", borderRadius: 2, marginRight: 2, fontSize: "12px", fontWeight: 500, height: "5rem", paddingTop: 1, paddingBottom: 2, marginBottom: 3 }}>
                                        <span>check-in</span>
                                        <span>Fri 13 Jan 2023</span>
                                        <span>From 12:00</span>
                                    </Container>
                                    <Container sx={{ border: "solid 1px #d4cecd", boxShadow: 7, display: 'flex', flexDirection: 'column', gap: "5px", borderRadius: 2, fontSize: "12px", fontWeight: 500, height: "5rem", paddingTop: 1, paddingBottom: 2, marginBottom: 3 }}>
                                        <span>check-in</span>
                                        <span>Fri 14 Jan 2023</span>
                                        <span>To 2:00</span>
                                    </Container>
                                </Container>
                                <Box component="span" sx={{ color: "#22779c", fontSize: "14px", fontWeight: "500", gap: "20px" }}>Total length of stay: 1 day</Box>
                            </Container>
                            <Container sx={{ display: 'flex', flexDirection: 'column', marginBottom: 3 }}>
                                <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>Room Type</Typography>
                                <span className='roomDesc'>Executive Delux room with private balcony</span>
                                <Link >change your selection</Link>
                            </Container>

                        </Grid>
    </>
  )
}

export default BookedRoom