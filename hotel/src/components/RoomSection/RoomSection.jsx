import React, { useState } from 'react'
import { Box, Button, Modal } from '@mui/material';
import { useSelector } from 'react-redux'
import {deleteRoomUrl, roomEditUrl} from "../../utils/apiRoutesHotel"
import axios from 'axios'
import "./roomSection.css"
import { useCookies } from 'react-cookie';

function RoomSection({props,edit,setEdit,callback,callbackDelete}) {

  const hotel = useSelector(state => state.hotel?.hotel)
  const [cookies, removeCookie, setCookie] = useCookies(['jwt'])
  const [token, setToken] = useState(cookies?.jwt)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [open, setOpen] = useState(false);
  const[roomDetails,setRoomDetails] = useState()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex ===props.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? props.images.length - 1 : prevIndex - 1
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async(roomType)=>{
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      await axios.post(deleteRoomUrl,{roomType,email:hotel.email},{
        headers: {
          withCredentials: true,
          'Authorization': `Bearer ${token}`
        }
      }).then((response)=>{
        console.log(response)
      })
    }
    
  }

  const handleEdit = async(id)=>{
    setEdit(true)
   
  }
  const handleAgree = () => {
    handleDelete(props.roomType);
    callbackDelete(true);
    setOpen(false);
  };

  return (
    <Box className='searchItem' sx={{padding:"20px",backgroundColor:"#edebeb"}}>
      <Box>
        {props.images.map((imageUrl, index) => (
          <img
            key={index}
            src={`${imageUrl}`}
            alt=""
            className="searchItemImg"
            onClick={() => handleImageClick(index)}
          />
        ))}
      </Box>

      <Modal open={isModalOpen} onClose={handleCloseModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: "100vw", maxHeight: "100vh",overflow:'scroll'}}>
        <Box sx={{ maxWidth: "60%", maxHeight: "60%" }}>
        <img src={props.images[selectedImageIndex]} alt="" style={{ width:"100%",height:"500px" }}  />

          <Box sx={{ display: 'flex', justifyContent: "space-between", marginTop: "20px" }}>
            <Button onClick={handlePrevImage} variant='contained'>
              Prev
            </Button>
            <Button onClick={handleNextImage} variant='contained'>
              Next
            </Button>
          </Box>
        </Box>
      </Modal>

      <div className="searchItemDesc">
        <h1 className='siTitle'> {props.roomType}</h1>
        <span className='siDistance' style={{ fontSize: "12px", fontWeight: "400" }}>{props.roomDesc}</span>
        <span className='siSubtitle'>{`Amenities:   ${props.amenities}`}</span>
        <span className='siFeautures'>{`Number of rooms: ${props.numberOfRooms}`}</span>
      </div>
      <div className="searchItemDetails">
        <div className="slDetailTexts">
          <span className="slPrice">₹ {props.price}</span>
          <span className='slTaxOp'>Include taxes and fees</span>
        </div>
        <Box sx={{ display: 'flex', justifyContent: "space-around", marginTop: "20px" }}>
          <Button variant='contained' color='error' onClick={()=>{
            handleDelete(props.roomType)
            callbackDelete(true)
            }}>delete</Button>
          <Button variant='contained' color='primary' onClick={()=>{

            callback(props)
            handleEdit(props._id)
          }
            }>edit</Button>
        </Box>
      </div>
    </Box>
  )
}

export default RoomSection;

