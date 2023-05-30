import { Grid, Box, Typography } from '@mui/material';
import React from 'react'

function PaymentCompleted(props) {
    const {hotel,order} = props 
    console.log(hotel)
    return (
        <>
            <Box bgcolor="#e6f4ea" p={2} sx={{marginTop:'1.5rem'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} lg={12}>
                        <Typography variant="h5" component="h2">
                            Payment Recieved
                        </Typography>
                        <Typography variant="h8">
                            {
                                `booking id : ${order}`
                            }
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={12}>
                        <Typography variant="body1" color="textSecondary" component="h8">
                            {
                                `${hotel?.name} is waiting for you !!`
                            }
                        </Typography>
                        <Typography variant="body1" color="primary" component="p">
                            {
                                `Contact hotel for further queries ${hotel?.phone}`
                            }
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}

export default PaymentCompleted