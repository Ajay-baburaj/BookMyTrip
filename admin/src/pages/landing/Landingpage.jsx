import { Grid, Paper, Typography ,Box} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { FaUsersSlash } from 'react-icons/fa';
import { MdVerified, MdOutlinePostAdd } from 'react-icons/md';
import { getAllBookingDetails, getAllBookings, getAllUsers } from '../../utils/ApiRoutesAdmin';
import { BiHotel } from 'react-icons/bi';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { AiOutlineBook } from 'react-icons/ai';


import axios from 'axios'
import Charts from '../../components/Chart';

function Landingpage() {
  const [data, setData] = useState();
  const [bookingData,setBookingData] = useState()
  const [userData,setUserData] = useState()

  useEffect(() => {
    getAllUser()
    getAllBooking()
  }, []);

  const getAllUser=async()=>{
    const {data} = await axios.get(getAllUsers)
    setUserData(data)
  }

  const getAllBooking = async()=>{
    const {data} = await axios.get(getAllBookings)
    setBookingData(data)
  }

  return (
    <>
      <Grid container  alignItems="center" justifyContent="center" p={2}>
        <Box sx={{padding:'10px',display:'flex',gap:'1rem'}}>
          <Grid item xs={8} md={3}>
            <Paper
              elevation={10}
              sx={{
                display: 'flex',
                width: '15rem',
                height: '10rem',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div>
                <FiUsers size={40} />
              </div>
              <div style={{ textAlign: 'center', padding: '10%' }}>
                <Typography variant="h6" color="#537188">Total Users</Typography>
                <Typography variant="h6" color="#537188">{userData&&userData.length}</Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={8} md={3}>
            <Paper
              elevation={10}
              sx={{
                display: 'flex',
                width: '15rem',
                height: '10rem',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div>
                <AiOutlineBook size={40} />
              </div>
              <div style={{ textAlign: 'center', padding: '10%' }}>
                <Typography variant="h6" color="#537188">Booking count</Typography>
                <Typography variant="h6" color="#537188">{bookingData && bookingData?.count}</Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={8} md={3}>
            <Paper
              elevation={10}
              sx={{
                display: 'flex',
                width: '15rem',
                height: '10rem',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div>
                <FaMoneyBillAlt size={40} />
              </div>
              <div style={{ textAlign: 'center', padding: '10%' }}>
                <Typography variant="h6" color="#537188">Total Amount</Typography>
                <Typography variant="h6" color="#537188">{bookingData && bookingData?.total}</Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={8} md={3}>
            <Paper
              elevation={10}
              sx={{
                display: 'flex',
                width: '15rem',
                height: '10rem',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div>
                <BiHotel size={40} />
              </div>
              <div style={{ textAlign: 'center', padding: '10%' }}>
                <Typography variant="h6" color="#537188">Hotels</Typography>
                <Typography variant="h6" color="#537188">{bookingData && bookingData?.hotelCount}</Typography>
              </div>
            </Paper>
          </Grid>
        </Box>
      </Grid>
      <Grid container spacing={4} columns={16} alignItems="center" justifyContent="center" p={2}>
        <Charts />
      </Grid>
    </>
  );
}

export default Landingpage;