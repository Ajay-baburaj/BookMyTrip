import React from 'react'
import { HotelCard } from '../components/hotelCard'
import { useEffect } from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box';
import { getCompleteDetailsUrl, getHotelData } from '../utils/ApiRoutesAdmin'
import axios from "axios"
import { Typography } from '@mui/material';
import ModalComponent from '../components/ModalComponent';
import { useCookies } from 'react-cookie';


const Hotels = () => {
  const [data, setData] = useState([])
  const [cmpltData, setCmpltData] = useState([])
  const [id, setId] = useState("")
  const [blocked, setBlocked] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [cookies,setCookie,removeCookie] = useCookies()
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  useEffect(() => {
    getHotelDetails()
  }, [blocked])

  const getHotelDetails = async () => {
    const data = await axios.get(getHotelData, {
      headers: {
        withCredentials: true,
        "Authorization": `Bearer ${cookies?.jwt}`
      }
    })
    setData(data?.data)
  }

  useEffect(() => {
    appendImagesWithDetails(data)
  }, [data])


  const appendImagesWithDetails = async (data) => {
    try {
      const promises = data.map(async (hotel) => {
        const hotelDetails = await axios.get(`${getCompleteDetailsUrl}/?id=${hotel._id}`, {
          headers: {
            withCredentials: true,
            "Authorization": `Bearer ${cookies?.jwt}`
          }
        })
        return hotelDetails?.data?.hotelData
      })
      const hotelDetails = await Promise.all(promises)
      setCmpltData(hotelDetails);
    } catch (err) {
      console.log(err.message)
    }
  }


  return (
    <>
      <Typography sx={{ textAlign: "center", fontWeight: "500", paddingTop: "2.5rem", paddingBottom: '2.5rem' }} variant='h5'>Hotels</Typography>
      <Box sx={{ display: 'flex', gap: '4rem' }}>

        {
          cmpltData && cmpltData.map((hotel, index) => (
            <HotelCard sx={{

            }} hotel={hotel} openfn={handleOpen}
              getIdCallback={(id) => setId(id)} closefn={handleClose} callback={() => setBlocked(!blocked)} />
          ))
        }

        <ModalComponent id={id} open={open} handleClose={handleClose} />
      </Box>
    </>
  )
}


export default Hotels