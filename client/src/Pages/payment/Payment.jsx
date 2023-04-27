import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Navbar } from 'react-bootstrap'
import Header from '../../components/header/Header'
import "./payment.css"
import { spacing } from '@mui/system';
import BookedRoom from '../../components/bookedRoom/BookedRoom'


function Payment() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={12} md={7} sx={{border:1,borderRadius:'10px'}}>
                    <h1>wallet</h1>
                </Grid>

            </Grid>
        </>
    )
}

export default Payment