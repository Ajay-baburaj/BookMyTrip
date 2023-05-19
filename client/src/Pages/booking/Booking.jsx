import "./booking.css"
import { Box, Button, Container, Grid, Typography, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'

import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import BookedRoom from '../../components/bookedRoom/BookedRoom';
import ShowHotel from '../../components/ShowHotel'
import { useSelector } from "react-redux";
import BookingForm from "../../components/BookingForm";
import { getRoomCmpltURL } from '../../utils/APIRoutes'
import axios from 'axios'
import Navbar from "../../components/navbar/Navbar";


function Booking() {
    const details = useSelector(state => state?.booking?.details)
    const user = useSelector(state => state.user.user)
    const [hotel, setHotel] = useState()
    const [room, setRoom] = useState()
    const [addGuest, setAddGuest] = useState(false)

    useEffect(() => {
        getCmpltRoomDtls()
    }, [])


    const getCmpltRoomDtls = async () => {
        const fetchedDetails = await axios.get(`${getRoomCmpltURL}/${details?.hotel}`)
        setHotel(fetchedDetails?.data)
    }

    return (
        <>
            <Navbar />
            <Header type="list" />
            <Box sx={{ marginTop: '5rem', marginLeft: { xs: '2rem', md: '5rem', lg: '5rem' }, marginRight: { xs: '2rem', md: '5rem', lg: '5rem' } }}>
                <Grid container spacing={5} alignItems="center" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    <Grid item xs={12} md={6} lg={5}>
                        <BookedRoom details={details} room={room} profile={false} addGuest={addGuest} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <ShowHotel hotel={hotel} search={true} />
                        <BookingForm callback={() => setAddGuest(!addGuest)} />
                    </Grid>
                </Grid>
            </Box>
            <MailList></MailList>
            <Footer></Footer>
        </>
    )
}

export default Booking