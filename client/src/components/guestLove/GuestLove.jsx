import React from 'react'
import "./guestLove.css"

function GuestLove() {
  return (
    <div className='guestLove'>
        <div className="guestLoveContainer">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/121399207.webp?k=b0e7119a0ba3354de23997d3698aac0296822fd58a590d83ddbb372f8af887a9&o=&s=1" alt="" className="glistImg" />
             <span className='glHotelName'>3 Epoques Apartments by Prague Residences</span>
             <span className='glCity'>Prague 1, Czech Republic, Praha 1</span>
             <span className='glPrice'>Starting from ₹17,586</span>
             <div className="glRating">
                <button className="glButton">8.9</button>
                <span className="glReview">Excellent</span>
             </div>
        </div>
        <div className="guestLoveContainer">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/87428762.webp?k=9a065fcd92168145d8c8358701662c76793535597b678efc8f6921c8e3c188e6&o=&s=1" alt="" className="glistImg" />
             <span className='glHotelName'>7Seasons Apartments Budapest</span>
             <span className='glCity'>06. Terézváros, Hungary, Budapest</span>
             <span className='glPrice'>Starting from ₹11,880</span>
             <div className="glRating">
                <button className="glButton">8.9</button>
                <span className="glReview">Excellent</span>
             </div>
        </div>
        <div className="guestLoveContainer">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/95058973.webp?k=979587fd2ac8f7777a34758264d557eef57d0e98e58bdaeb121f5b968a20f810&o=&s=1" alt="" className="glistImg" />
             <span className='glHotelName'>Oriente Palace Apartments</span>
             <span className='glCity'>Centro, Spain, Madrid</span>
             <span className='glPrice'>Starting from ₹12,350</span>
             <div className="glRating">
                <button className="glButton">8.9</button>
                <span className="glReview">Excellent</span>
             </div>
        </div>
        <div className="guestLoveContainer">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/352170812.webp?k=75ffc5f9eb3f3cc394b901714c1544757b05849dbbdf30e4fc8c6df53931c131&o=&s=1" alt="" className="glistImg" />
             <span className='glHotelName'>numa I Vita Apartments</span>
             <span className='glCity'>Fortezza da Basso, Italy, Florence</span>
             <span className='glPrice'>Starting from ₹15,375</span>
             <div className="glRating">
                <button className="glButton">8.9</button>
                <span className="glReview">Excellent</span>
             </div>
        </div>
    </div>
  )
}

export default GuestLove