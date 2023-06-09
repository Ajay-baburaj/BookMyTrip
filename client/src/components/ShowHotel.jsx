import React from 'react';
import { 
    Box,
    Grid,
    Button,
    CardActions,
    CardContent,
    CardMedia,
    Typography
  } from '@mui/material';
  
function ShowHotel({ hotel, search }) {

    return (
        <>
            <Grid container spacing={2} >
                <Grid item xs={12} lg={4}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={search ? hotel?.hotelImage[0] : hotel?.hotelImage[0]}
                        alt=""
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {search ? hotel?.name : 'Hotel name'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {search ? hotel?.landmark : 'Hotel landmark'}
                        </Typography>
                        <Typography variant="body1" color="primary" component="p">
                            1 extra-large double bed
                        </Typography>
                        <Typography variant="caption" color="textSecondary" component="p">
                            You can cancel later, so lock in this great price today.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                            <Box style={{ display: "flex", alignItems: "center" }} sx={{gap:'10px'}}>
                                <Typography variant="subtitle1">{hotel?.rating && hotel.rating > 8 ? "Excellent" : hotel?.rating && hotel.rating > 6 ? "Good" : "Average"}</Typography>
                                <Button size="small" variant="contained" color="primary">
                                   {hotel?.rating}
                                </Button>
                            </Box>
                        </div>
                    </CardActions>
                </Grid>
            </Grid>

        </>
    );
}

export default ShowHotel;
