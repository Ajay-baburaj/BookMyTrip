import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { deleteHotelUrl, getDataUrl } from '../utils/apiRoutesHotel';
import axios from 'axios';
import ImageSlider from '../components/ImageSlider';

const HotelProfile = () => {
  const [cookies, removeCookie, setCookie] = useCookies(['jwt']);
  const [token, setToken] = useState(cookies?.jwt);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const hotel = useSelector(state => state.hotel.hotel);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete? Data cannot be retrieved.");
    if (confirmed) {
      await axios.delete(`${deleteHotelUrl}/${id}`, {
        headers: {
          withCredentials: true,
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        navigate("/hotel/register");
      });
    }
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  const fetchHotel = async () => {
    const response = await axios.get(getDataUrl + `/${hotel?.email}`, {
      headers: {
        withCredentials: true,
        'Authorization': `Bearer ${token}`
      }
    });
    setData(response?.data?.hotelData);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F0F0F0",
        backgroundSize: "cover",
        padding: "50px"
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          margin: '0 auto',
          marginTop: 'var(--theme-spacing-4)',
          paddingBottom: "20px"
        }}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="hotel">
              {/* {data ? data?.name[0]: ""} */}
            </Avatar>
          }
          title={
            <Typography
              variant="h5"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 500,
                letterSpacing: '0.02rem',
              }}
            >
              {data?.name}
            </Typography>
          }
          subheader={data?.city}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
            padding: "20px",
            maxWidth: '700px'
          }}
        >
          {data.hotelImage && <ImageSlider images={data?.hotelImage} />}
        </Box>
        <CardContent sx={{ marginTop: "1.5rem" }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "25px"
            }}
          >
            {data?.description?.length > 400
              ? data?.description.substring(0, 400)
              : data?.description}
          </Typography>
          <Box sx={{ marginTop: "1.5rem" }}>
            <Typography variant="body2" color="textSecondary" component="p">
              <LocationOnIcon sx={{ marginRight: "theme.spacing(1)" }} />
              {`${data?.street},${data?.landmark},${data?.city}`}
              <br />
              <PhoneIcon sx={{ marginRight: "theme.spacing(1)" }} />
              {data?.phone}
              <br />
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton aria-label="add to favorites" />
          <IconButton aria-label="share" />
        </CardActions>
      </Card>
    </Box>
  );
};

export default HotelProfile;
