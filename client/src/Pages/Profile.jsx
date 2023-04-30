import React from 'react'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import Navbar from '../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const user = useSelector(state=>state?.user?.user)
    const navigate = useNavigate()
  return (
     <>
      <Navbar />
      <Container maxWidth={"lg"}>
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            alignItems: "center",
            gap: "0 14px",
          }}
        >
          <img
            style={{
              borderRadius: "100%",
              width: 60,
              height: 60,
              objectFit: "cover",
            }}
            src={'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-850.jpg?w=740&t=st=1682795701~exp=1682796301~hmac=c211147536693a7dd724ed38bdcf54a1501e7f9668081df8e00c52595460a9d5'}
            alt={user?.username}
          />
          <Typography variant={"h6"}>{user?.username}</Typography>
        </Box>
        <Typography marginTop={3} fontWeight={"bold"} variant={"h6"}>
          Booking History
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Hotel Name</TableCell>
                <TableCell align="right">Hotel Address</TableCell>
                <TableCell align="right">Check In</TableCell>
                <TableCell align="right">Check Out</TableCell>
                <TableCell align="right">Number of guests</TableCell>
                <TableCell align="right">status</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {bookings.map((row, index) => ( */}
                <TableRow
                  key={1}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } ,cursor:'pointer'}}
                  onClick={()=>navigate('/booking/details/:id')}
                >
                  <TableCell component="th" scope="row">
                    {"row?.data?.hotelName"}
                  </TableCell>
                  <TableCell align="right">{"row?.data?.hotelAddress"}</TableCell>
                  <TableCell align="right">{"row?.data?.bookingStart"}</TableCell>
                  <TableCell align="right">{"row?.data?.bookingEndDate"}</TableCell>
                  <TableCell align="right">
                    {"row?.data?.numberOfGuests"}
                  </TableCell>
                  <TableCell align="right">${"row?.data?.price"}</TableCell>
                </TableRow>
              {/* ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

export default Profile