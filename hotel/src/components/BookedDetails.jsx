import React, { useEffect } from 'react';
import { Box, CardContent, Container, Grid, Badge, Typography } from '@mui/material';
import { DateRange, HotelOutlined, ArrowRightAlt as ArrowRightAltIcon } from '@mui/icons-material';
import MailIcon from '@material-ui/icons/Mail';
import { Bed, Person } from '@mui/icons-material'
import ImageGallery from '../components/ImageGallery';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function BookedDetails({ bookingId }) {
    const data = useSelector(state => state?.bookings)
    const booking = data.find((item) => item._id == bookingId)
    const [bookingData, setBookingData] = useState(booking)
    console.log(bookingData);



    return (
        <>
            <Container maxWidth={"lg"} sx={{ marginTop: 2 }}>
                <Typography fontSize={22} sx={{ lineHeight: 1.9 }}>
                    Booking Details
                </Typography>
                <Typography fontSize={18} sx={{ lineHeight: 1.9 }}>
                    Booked Room:
                </Typography>
                <Typography fontSize={16} color={'#484d49'} sx={{ fontWeight: 'bold' }}>{bookingData?.roomDetails.roomType}</Typography>
                <ImageGallery images={bookingData?.roomDetails?.images} />
                <Grid item xs={12} sm={6} md={8} lg={6}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                            <Badge badgeContent={bookingData?.status} color="primary" sx={{ backgroundColor: "green" }}>
                            </Badge>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'flex-start' }}>
                            <Box >
                                <DateRange />
                                <Typography variant="h8">
                                    {bookingData?.checkInDate}
                                </Typography>
                            </Box>
                            <Box>
                                <ArrowRightAltIcon />
                            </Box>
                            <Box>
                                <DateRange />
                                <Typography variant="h8">
                                    {bookingData?.checkInDate}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '15px' }}>
                            <Box sx={{ display: 'flex', gap: '15px', marginTop: '1rem' }}>
                                <Bed />
                                <Typography>Rooms:</Typography>
                                <Typography>{bookingData?.numberOfRooms}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '15px', marginTop: '1rem' }}>
                                <Person />
                                <Typography>Guests:</Typography>
                                <Typography>{bookingData?.guests}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{display:'flex',gap:'10px',marginTop:"1rem"}}>
                            <Typography sx={{fontWeight:'bold'}}>Total Amount:</Typography>
                            <Typography sx={{fontWeight:'bold'}}>{bookingData?.total}</Typography>
                        </Box>
                        <Box sx={{ marginTop: "1rem" }}>
                            {
                                bookingData?.bookedBy ? (<>
                                    <Box sx={{ width: '100%', padding: '15px', backgroundColor: '#DBDFEA', borderRadius: '5px' }}>
                                        <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>Booked by:</Typography>
                                        <Box sx={{ display: 'flex', gap: '15px' }}>
                                            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>{bookingData?.bookedBy.name}</Typography>
                                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                                <MailIcon />
                                                <Typography sx={{ fontSize: "14px" }}>{bookingData?.bookedBy.email}</Typography>
                                            </Box>
                                        </Box>

                                    </Box>
                                </>) : ''
                            }
                        </Box>
                    </CardContent>
                </Grid>

            </Container>
        </>
    )
}

export default BookedDetails