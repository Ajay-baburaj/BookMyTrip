import React from 'react'
import "./searchItem.css"
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import slugify from 'slugify';

function SearchItem({ hotel, key, search }) {
  const navigate = useNavigate()

  function generateSlugFromObjectId(objectId) {
    const objectIdString = objectId.toString();
    const slug = objectIdString.replace(/[^a-z0-9]/gi, '-');
    return slug;
  }

  const slug = generateSlugFromObjectId(hotel._id);


  return (
    <div className='searchItem'>
      <img src={search ? hotel?.hotelImage[0] : hotel?.hotelImage[0]} alt="" className="searchItemImg" />
      <div className="searchItemDesc">
        <h1 className='siTitle'>{search ? hotel?.name : "hotel name"}</h1>
        <span className='siDistance' style={{ fontSize: "12px", fontWeight: "400" }}>{search ? hotel?.landmark : "hotel landmark"}</span>
        <span className='siSubtitle'>Type of the residency</span>
        <span className='siFeautures'>1 extra-large double bed</span>
        <span className='siCancelOp'>1 Free cancellation</span>
        <span className='siCancelOpSubtitle'>You can cancel later, so lock in this great price today.</span>

      </div>
      <div className="searchItemDetails">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <Box style={{ display: "flex", alignItems: "center" }} sx={{ gap: '10px' }}>
            <Typography variant="subtitle1"  sx={{fontSize:'16px',fontWeight:'bold'}}>{search && hotel?.rating && hotel.rating > 8 ? "Excellent" : hotel?.rating && hotel.rating > 6 ? "Good" : "Average"}</Typography>
            <Button size="small" variant="contained" color="primary" sx={{fontWeight:'bold'}}>
              <span style={{fontWeight:'bold'}}>{search ? hotel?.rating: ''}</span>
            </Button>
          </Box>
        </div>
        <div className="slDetailTexts">
          {
            search ? (
              <>
                <span className="slPrice">₹{search ? hotel?.rooms[0]?.price : ""}</span>
                <span className='slTaxOp'>{search ? "Include taxes and fees" : ""}</span>
                <button className='slCheckButton' onClick={() => navigate(`/hotels/${slug}`)}>See availability</button>
              </>
            ) : ""

          }


        </div>
      </div>
    </div>
  )
}

export default SearchItem