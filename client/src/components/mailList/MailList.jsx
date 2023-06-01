import React from 'react'
import './mailList.css'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function MailList() {
  const navigate = useNavigate()
  return (
    <div className='mail'>
      <h1 className="mailTitle">save time, save money!</h1>
      <span className="mailDesc">Sign up and we'll send the best deals to you</span>
      <div className="mailInputContainer">
        <input type="text" placeholder='Your Email' />
        <button>Subscribe</button>
      </div>
      <Box>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => window.open('https://hotel.bookmytrip.site/hotel/register', '_blank')}
        >
          Become a host
        </Button>
      </Box>
    </div>
  )
}

export default MailList