import React from 'react'
import "./searchItem.css"
import { useNavigate } from 'react-router-dom';


function SearchItem({ hotel, key, search }) {
  const navigate = useNavigate()
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
        <div className="slRating">
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className="slDetailTexts">
          {
            search ? (
              <>
                <span className="slPrice">₹{search ? hotel?.rooms[0]?.price : ""}</span>
                <span className='slTaxOp'>{search ? "Include taxes and fees" : ""}</span>
                <button className='slCheckButton' onClick={() => navigate(`/hotels/${hotel._id}`)}>See availability</button>
              </>
            ): ""

          }


        </div>
      </div>
    </div>
  )
}

export default SearchItem