import React from 'react'
import "./connectWithTravelers.css"

function ConnectWithTravelers() {
  return (
    <div className='connectWithTravelers'>
        <div className='connectWithTravelItem'>
            <img src="https://cf.bstatic.com/static/img/communities/cover-photo/300x300/travel-discussions/f43b42664bbf44f174b44c64fd71440b4af56888.jpg" alt="connectTravelersImage" />
            <div className="connectTitleContainer">
                <span className='connectTitle'>Travel Discussions</span>
                <span className='connectSub'>View forum</span>
                <span className='connectTravelers'>155,073 travellers</span>
            </div>
        </div>
        <div className='connectWithTravelItem'>
            <img src="https://cf.bstatic.com/static/img/communities/communities-index/photo-300x300/592ac5a7bbd5433c1aba6f1afdea794e572c9a69.png" alt="connectTravelersImage" />
            <div className="connectTitleContainer">
                <span className='connectTitle'>Travel community</span>
                <span className='connectSub'>view more communities</span>
                <span className='connectTravelers'>9073 travellers</span>
            </div>
        </div>
    </div>
  )
}

export default ConnectWithTravelers