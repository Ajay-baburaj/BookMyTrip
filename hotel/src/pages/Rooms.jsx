import React, { useState } from 'react'
import { Box, Grid, Typography, TextField, FormControl, FormLabel, Button, Modal } from '@mui/material';
import AddRoom from '../components/AddRoom';
import RoomSection from '../components/RoomSection/RoomSection'
import { useEffect } from 'react';
import axios from 'axios'
import { getRoomDetailsUrl } from '../utils/apiRoutesHotel'
import { useSelector,useDispatch} from 'react-redux';
import {HOTEL_DETAILS} from '../reduxStore/hotelSlice'
import { useCookies } from 'react-cookie';



function Rooms() {

  const hotel = useSelector(state=>state.hotel.hotel)
  const [cookies, removeCookie, setCookie] = useCookies(['jwt'])
  const [token, setToken] = useState(cookies?.jwt)
  const [editRoom,setEditRoom] = useState([])
  const [addRoom,setAddRoom] = useState(false) 
  const [deleteImg,setDeleteImg] = useState(false)
  const dispatch = useDispatch()
  const style = {
    width: '80%',
    maxWidth: '1000px',
    maxHeight: '80vh',
    overflowY: 'auto',
    m: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false)
     setEdit(false)}
  
  const [roomData, setRoomData] = useState([])
  const [edit,setEdit] = useState(false)
  const [deleteRoom,setDeleteRoom] = useState(false);

  useEffect(() => {
    fetchRoomDetails()
    if(edit){
      setOpen(true)
    }else{
      setOpen(false)
    }

  }, [edit,deleteRoom,addRoom,deleteImg])

  const fetchRoomDetails = async () => {
    const { data } = await axios.get(getRoomDetailsUrl+`/?email=${hotel.email}`,{
      headers: {
        withCredentials: true,
        'Authorization': `Bearer ${token}`
      }
    })
    dispatch(HOTEL_DETAILS(data.roomDetails))
    const rooms = data?.roomDetails?.rooms
    setRoomData(rooms)
  }

 
  return (
    <Box sx={{ paddingLeft: "5rem", paddingRight: "5rem", marginTop: "3rem" }}>
      <Typography sx={{ fontSize: "32px", fontWeight: "bold", textAlign: "center", marginBottom: "2rem" }}>Room Management</Typography>
     
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" onClick={handleOpen}>Add room</Button>
                <Button variant="contained" disabled>{`Type of rooms: ${hotel?.rooms.length}`}</Button>
              </Box>
              <Grid item xs={12} md={12} lg={12} sx={{ marginTop: "3rem" }}>
                {
              
                  roomData && roomData.map(room =>
                    <RoomSection props ={room} edit = {edit} setEdit = {setEdit} callback = {(value)=>setEditRoom(value)} 
                      callbackDelete ={(value)=>setDeleteRoom(!deleteRoom)}
                    />
                  )
                }
               
              </Grid>

            </Grid>
          </Grid>

       
      


      {/* ----------------------room add modal------------------- */}

  
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: '80%', maxWidth: 'none' }}>
         { edit ? <AddRoom edit={edit} roomData={editRoom} deleteFn={()=>setDeleteImg(!deleteImg)}/> : <AddRoom edit={edit} callback={(value)=>setAddRoom(value)} deleteFn={()=>setDeleteImg(!deleteImg)}/>} 
        </Box>
      </Modal>
      {/* ------------------------------------------------------------ */}

    </Box>
  )
}

export default Rooms