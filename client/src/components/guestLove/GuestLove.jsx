import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getRatingWiseHotelUrl } from '../../utils/APIRoutes';
import { Grid, Card, CardActionArea, CardContent, Typography, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import "./guestLove.css";

function GuestLove() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [datas, setDatas] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    getDatas();
  }, []);

  const getDatas = async () => {
    const { data } = await axios.get(getRatingWiseHotelUrl);
    setDatas(data);
  };

  const handleNext = () => {
    setActive((prevActive) => (prevActive + 1) % datas.length);
  };

  const handlePrev = () => {
    setActive((prevActive) => (prevActive - 1 + datas.length) % datas.length);
  };

  const visibleItems = isMobile ? datas.slice(0, 2) : datas;

  return (
    <div className="guestLove">
      {!isMobile && (
        <div className="carousel-nav">
          <IconButton onClick={handlePrev} disabled={active === 0}>
            <ChevronLeft fontSize="large" />
          </IconButton>
        </div>
      )}
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {visibleItems.map((hotel, index) => (
              <Grid item key={hotel._id} xs={6} sm={4} md={4}>
                <Card className={`guestLoveContainer ${active === index ? 'active' : ''}`} onClick={() => navigate(`/hotels/${hotel._id}`)} style={{ cursor: "pointer" }}>
                  <CardActionArea>
                    <div className="card-image">
                      <img src={hotel.hotelImage[0]} alt="" className="glistImg" />
                    </div>
                    <CardContent>
                      <Typography variant="h6" className="glHotelName">
                        {hotel.name}
                      </Typography>
                      <Typography variant="subtitle1" className="glCity">
                        {hotel.city}
                      </Typography>
                      <div className="glRating">
                        <button className="glButton">{hotel.rating}</button>
                        <span className="glReview">
                          {hotel.rating && hotel.rating > 8 ? "Excellent" : hotel.rating && hotel.rating > 6 ? "Good" : "Average"}
                        </span>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      {!isMobile && (
        <div className="carousel-nav">
          <IconButton onClick={handleNext} disabled={active === datas.length - 1}>
            <ChevronRight fontSize="large" />
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default GuestLove;
