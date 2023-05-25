import { Grid, Paper, Typography ,Box} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { getAllBookings} from '../utils/apiRoutesHotel';
import { BiHotel } from 'react-icons/bi';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { AiOutlineBook } from 'react-icons/ai';
import {useSelector} from 'react-redux'
import axios from 'axios'
import Charts from '../components/Charts';

function Dashboard() {
  const user = useSelector(state=>state?.hotel?.hotel)
  const [data, setData] = useState();
  const [bookingData,setBookingData] = useState()

  useEffect(() => {
    getAllBooking()
  }, []);

 

  const getAllBooking = async()=>{
    const {data} = await axios.get(`${getAllBookings}/${user?._id}`)
    setBookingData(data)
  }

  return (
    <>
      <Grid container  alignItems="center" justifyContent="center" p={2}>
        <Box sx={{padding:'10px',display:'flex',gap:'1rem'}}>
          <Grid item xs={8} md={4}>
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
                <Typography variant="h6" color="#537188">Todays Booking</Typography>
                <Typography variant="h6" color="#537188">{bookingData&&bookingData.todaysBookings}</Typography>
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
                <Typography variant="h6" color="#537188">This month</Typography>
                <Typography variant="h6" color="#537188">{bookingData && bookingData?.monthlyBookings}</Typography>
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
                <Typography variant="h6" color="#537188">Total Bookings</Typography>
                <Typography variant="h6" color="#537188">{bookingData && bookingData?.bookingCount}</Typography>
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
                <Typography variant="h6" color="#537188">Total Renevue</Typography>
                <Typography variant="h6" color="#537188">{bookingData && bookingData?.totalSum}</Typography>
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

export default Dashboard;