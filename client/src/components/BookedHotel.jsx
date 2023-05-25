import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { HotelOutlined } from '@mui/icons-material';
import { DateRange } from '@material-ui/icons';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Badge } from '@mui/material';


const BookedHotel = (data) => {
  const user = useSelector(state => state?.user?.user)
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/booking/details/${data?.data?._id}`)} sx={{ cursor: 'pointer' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4} >
          <CardMedia
            component="img"
            height="150px"
            image={data?.data?.hoteldetails?.hotelImage[0]}
            alt="hotelIMg"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={6}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ marginLeft: { lg: '17rem' } }}>
              <Badge badgeContent={data?.data?.status} color="primary" sx={{ backgroundColor: "green" }}>
              </Badge>
            </Box>

            <Typography variant="h7" color="primary">
              {data?.data && data?.data?.hoteldetails?.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <HotelOutlined />
              <Typography variant="h8">
                {data?.data && data?.data?.roomDetails.roomType}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <Box sx={{}}>
                <DateRange />
                <Typography variant="h8">
                  {data?.data && data?.data?.checkInDate}
                </Typography>
              </Box>
              <Box>
                <ArrowRightAltIcon />
              </Box>
              <Box>
                <DateRange />
                <Typography variant="h8">
                  {data?.data && data?.data?.checkOutDate}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default BookedHotel;
