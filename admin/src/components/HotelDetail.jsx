import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Container, Typography, Box, CardContent, ListItem, Grid } from "@mui/material";
import ImageGallery from './ImageGallery';
import { getSingleHotelDetails } from '../utils/ApiRoutesAdmin';
import { useCookies } from 'react-cookie';

const HotelDetail = ({ id }) => {
    const [hotel, setHotel] = useState({})
    const [cookies,setCookie,removeCookie] = useCookies()



    useEffect(() => {
        fetchHotel()
    }, [])

    const fetchHotel = async () => {
        const details = await axios.get(`${getSingleHotelDetails}/${id}`,{
            headers:{
                withCredentials:true,
                "Authorization":`Bearer ${cookies?.accessToken}`
            }
        })
        setHotel(details?.data)

    }

    return (
        <>
            <Container
                maxWidth={"lg"}
                sx={{
                    marginTop: 2,
                }}
            >
                <Typography fontSize={22} sx={{ lineHeight: 1.9 }}>
                    {hotel.name}
                </Typography>
                <Typography fontSize={14} color={'#484d49'}  >
                    {`${hotel.street} ${hotel.city}`}
                </Typography>
                <Typography fontSize={14} color={'#484d49'}  >
                    {`${hotel.landmark} pincode: ${hotel.pincode}`}
                </Typography>
                <Typography fontSize={14} color={'#484d49'} sx={{ marginBottom: 3 }} >
                    {`${hotel.email} ${hotel.phone}`}
                </Typography>
                <ImageGallery images={hotel?.hotelImage} />
                <Box sx={{ marginTop: '2rem', padding: '10px' }}>
                    <Typography>{hotel?.description}</Typography>
                </Box>
                <Box>
                    <Typography variant='h5' sx={{fontWeight:'bold' ,marginTop:"10px",marginBottom:"10px"}}>Rooms</Typography>
                    {
                        hotel?.rooms && hotel?.rooms.map((room, index) => (
                            <Grid key={index}>
                                <Box>
                                    <Typography sx={{fontSize:"18px" ,fontWeight:"bold", marginTop:"10px",marginBottom:"10px"}}>
                                        <span style={{marginRight:"3px"}}>{index+1}.</span>{room?.roomType}</Typography>
                                    <Typography fontSize={14} color={'#484d49'}>{room?.roomDesc}</Typography>
                                    <Typography fontSize={14} color={'#484d49'} sx={{marginBottom:"10px"}}><span style={{fontSize:"14px",fontWeight:"bold"}}>Amenities : </span>{room?.amenities}</Typography>
                                </Box>
                                <ImageGallery images ={room.images}/>
                            </Grid>


                        ))
                    }
                </Box>


            </Container>
        </>
    )
}

export default HotelDetail











