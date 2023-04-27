import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import {
  faLocationDot, faCircleXmark, faCircleArrowLeft, faCircleArrowRight,
  faBed, faArrowsLeftRightToLine
} from '@fortawesome/free-solid-svg-icons';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './hotel.css'
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import { bookRoomUrl, getRoomCmpltURL } from '../../utils/APIRoutes'
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

function Hotel() {
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalImg: {
      maxWidth: '90%',
      maxHeight: '90%',
    },
  }));

  const classes = useStyles();
  const hotel = useSelector(state => state)
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState({})
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOpen = (index) => {
    setSlideNumber(index)
    setOpen(!open)
  }

  useEffect(() => {
    getCmpltRoomDtls()
  }, [])

  const handleBooking = async (roomId) => {
      const { date, destination, options } = hotel?.search
    const bookingData = {
      userId: hotel?.user?.user?._id,
      roomId,
      hotelId: id,
      date,
      destination,
      options
    }
    await axios.post(bookRoomUrl, { ...bookingData }).then((response) => {
      dispatch({
        type: "BOOK_ROOM",
        payload: {...response?.data}
      })
      navigate(`/booking/${response?.data?._id}`)
    })
  }

  const getCmpltRoomDtls = async () => {
    const fetchedDetails = await axios.get(`${getRoomCmpltURL}/${id}`)
    setDetails(fetchedDetails?.data)
  }
  console.log("details", details)

  const [selectedImgIndex, setSelectedImgIndex] = useState(null);

  const handleImgClick = (index) => {
    setSelectedImgIndex(index);
  };


  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }
    setSlideNumber(newSlideNumber)
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {
          open &&
          <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
            <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
            <div className="sliderWrapper">
              <img src={details?.hotelImage[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
          </div>
        }
        <div className="hotelWrapper">
          {/* <button className="bookNow">Reserve or Book Now</button> */}
          <h1 className="hotelTitle">{details.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{`${details.city} ${details.landmark}`}</span>
          </div>
          <span className='hotelDistance'>{`Excellent location -${500}m from center`}</span>
          <span className='hotelPriceHighLight'>
            Book a stay over 20000 at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {
              details?.hotelImage ? (details?.hotelImage.map((photo, index) => (

                <div className="hotelImgWrapper">
                  <img onClick={() => handleOpen(index)} src={photo} alt="" className="hotelImg" />
                </div>
              ))) : ""

            }

          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsText">
              <h1 className="hotelTitle">Stay in the heart of {details?.city}</h1>
              <p className="hotelDesc">
                {
                  details?.description
                }
              </p>
            </div>

          </div>
        </div>

        <div className="selectRoom">

          <Table className="table">
            <Thead>
              <Tr>
                <Th>Rooms</Th>
                <Th>Ameneties</Th>
                <Th>Price</Th>
              </Tr>
            </Thead>

            {
              details?.rooms && details.rooms.map(room => (
                <Tbody>
                  <Tr>
                    <Td>
                      <div className="roomDetailsContainer">
                        <div className="roomImgcontainer" style={{ width: "300px" }}>
                          <h5>{room.roomType}</h5>
                          <Carousel className='carousel'>
                            {room.images && room.images.map((img, idx) => (
                              <Carousel.Item key={idx}>
                                <img
                                  className="w-100 carouselImg"
                                  src={img}
                                  alt="room photos"
                                  onClick={() => handleImgClick(idx)}
                                />
                              </Carousel.Item>
                            ))}
                          </Carousel>
                        </div>
                        <Modal
                          className={classes.modal}
                          open={selectedImgIndex !== null}
                          onClose={() => setSelectedImgIndex(null)}
                          closeAfterTransition
                          BackdropComponent={Backdrop}
                          BackdropProps={{
                            timeout: 500,
                          }}
                        >
                          <Fade in={selectedImgIndex !== null}>
                            <img
                              className={classes.modalImg}
                              src={room.images[selectedImgIndex]}
                              alt="modal img"
                            />
                          </Fade>
                        </Modal>
                      </div>

                    </Td>
                    <Td>
                      <div className="roomFeaturesContainer">
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                          <FontAwesomeIcon icon={faBed} />
                          <FontAwesomeIcon icon={faArrowsLeftRightToLine} />
                        </Box>
                        <span style={{ marginBottom: "10px" }}>{room.roomDesc}</span>
                        <span>{room.amenities}</span>
                      </div>
                    </Td>
                    <Td>
                      <div className="selectContainer">
                        <span>₹ {room.price}</span>
                        <button onClick={() => handleBooking(room._id)}>Select Room</button>
                      </div>
                    </Td>
                  </Tr>


                </Tbody>
              ))
            }


          </Table>

        </div>
      </div>


      <MailList />
    </div>
  )
}

export default Hotel;