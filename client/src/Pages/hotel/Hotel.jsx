import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import {
  faLocationDot, faCircleXmark, faCircleArrowLeft, faCircleArrowRight,
  faBed, faArrowsLeftRightToLine
} from '@fortawesome/free-solid-svg-icons';
// import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { toast, Toaster } from 'react-hot-toast'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { bookRoomUrl, deleteReviewUrl, getReviewForEditUrl, getRoomCmpltURL, validateUserReview, writeReviewUrl } from '../../utils/APIRoutes'
import { Typography, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie';
import './hotel.css'
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Bed, CompareArrows } from '@mui/icons-material';




function Hotel() {
  const hotel = useSelector(state => state)
  const user = useSelector(state => state?.user?.user)
  const booking = useSelector(state => state?.booking?.details)
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);
  const search = useSelector(state => state.search)
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState({})
  const [showTextField, setShowTextField] = useState(false)
  const [review, setReview] = useState({ rating: '', review: '' })
  const [reviewAdded, setReviewAdded] = useState(false)
  const [deleteStatus, setDeleteStatus] = useState(false)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOpen = (index) => {
    setSlideNumber(index)
    setOpen(!open)
  }


  useEffect(() => {
    getCmpltRoomDtls()
  }, [reviewAdded, deleteStatus])

  const handleBooking = async (roomId) => {
    if (user) {
      const { date, destination, options } = hotel?.search
      console.log("date", date)
      const bookingData = {
        userId: hotel?.user?.user?._id,
        roomId,
        hotelId: id,
        date,
        destination,
        options
      }

      const checkInDate = new Date(date[0]?.startDate).toDateString()
      const checkOutDate = new Date(date[0]?.endDate).toDateString()
      const bookingOutDate = new Date(booking?.checkOutDate).toDateString()
      const bookingInDate = new Date(booking?.checkInDate).toDateString()


      if (roomId == booking?.room && id == booking?.hotel && JSON.stringify(options) == JSON.stringify(booking?.options) && (checkInDate == bookingInDate && checkOutDate == bookingOutDate)) {
        navigate(`/booking/${booking?._id}`)
      } else {
        await axios.post(bookRoomUrl, { ...bookingData },
          {
            headers: {
              withCredentials: true,
              'Authorization': `Bearer ${cookies?.accessToken}`
            }
          }
        ).then((response) => {
          console.log("response", response)
          dispatch({
            type: "BOOK_ROOM",
            payload: { ...response?.data }
          })

          navigate(`/booking/${response?.data?._id}`)
        })
      }
    } else {
      navigate('/login')
    }

  }

  const getCmpltRoomDtls = async () => {
    const fetchedDetails = await axios.get(`${getRoomCmpltURL}/${id}`)
    setDetails(fetchedDetails?.data)
  }


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

  const handleReview = async () => {
    const userId = hotel?.user?.user?._id
    if (userId) {
      const { data } = await axios.post(validateUserReview, { user: userId, hotel: id }, {
        headers: {
          withCredentials: true,
          'Authorization': `Bearer ${cookies?.accessToken}`
        }
      })
      if (data.status) {
        setShowTextField(!showTextField)
      } else {
        toast.error(data?.msg)
        setShowTextField(false)
      }
    } else {
      navigate('/login')
    }
  }

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value })
  }


  const handleReviewSubmit = async () => {
    const reviewObj = {
      username: user.username,
      userId: user._id,
      review,
      hotel: id
    }
    const { data } = await axios.post(writeReviewUrl, reviewObj, {
      headers: {
        withCredentials: true,
        'Authorization': `Bearer ${cookies?.accessToken}`
      }
    })
    if (data?.status) {
      toast.success(data?.msg)
      setReviewAdded(!reviewAdded)
      setShowTextField(false)
    }
  }
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = (reviewId) => {
    const { data } = axios.delete(`${deleteReviewUrl}/?hotel=${id}&reviewId=${reviewId}`, {
      headers: {
        withCredentials: true,
        'Authorization': `Bearer ${cookies?.accessToken}`
      }
    })
    setOpenDialog(false);
    setDeleteStatus(!deleteStatus)
    toast.success("review deleted")
  }

  const handleEditReview =async(reviewId)=>{
    const {data} = await axios.get(`${getReviewForEditUrl}/${reviewId}`)
    alert(data?.review?.userReview)
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

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '10px' }}>
            <Typography variant='h7' sx={{ marginTop: 1, marginBottom: 1 }}>Take a look at user reviews</Typography>
            <Box sx={{ display: 'flex', gap: '15px' }}>
              {
                details?.reviews && details?.reviews.map((review, index) => (
                  <Box key={index} sx={{ border: '1px solid black', display: 'flex', flexDirection: 'column', fontSize: '14px', maxWidth: '200px', padding: '10px', borderRadius: '10px' }}>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                      <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png?w=740&t=st=1679303737~exp=1679304337~hmac=9a0d99da350810dd8e2f71f5127f56af325bc8f2e2e1ba980fd58fff858c483ec"
                        style={{ width: '20px' }}
                        alt="profile-img" />
                      <Typography variant='p'>{review.username}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', gap: '5px' }}>
                      {review && (
                        <>
                          {review.rating === "excellent" && (
                            <Rating name="read-only" value={5} readOnly sx={{ fontSize: '15px' }} />
                          )}
                          {review.rating === "good" && (
                            <Rating name="read-only" value={4} readOnly sx={{ fontSize: '15px' }} />
                          )}
                          {review.rating === "average" && (
                            <Rating name="read-only" value={2} readOnly sx={{ fontSize: '15px' }} />
                          )}
                          {review.rating === "poor" && (
                            <Rating name="read-only" value={1} readOnly sx={{ fontSize: '15px' }} />
                          )}
                          {review.rating === "worst" && (
                            <Rating name="read-only" value={0} readOnly sx={{ fontSize: '15px' }} />
                          )}
                        </>
                      )}
                      <Typography variant='p'>{review?.rating}</Typography>
                    </Box>
                    <Typography variant='p'>{review.userReview}</Typography>
                    {user && review.userId === user._id && (
                      <Box sx={{ display: 'flex', gap: '25px', fontWeight: 'bold', marginTop: '1rem', cursor: 'pointer' }}>
                        <Typography color='red' fontWeight='bold' onClick={() => setOpenDialog(true)}>delete</Typography>
                        <Typography color='primary' fontWeight='bold' onClick={()=>handleEditReview(review.reviewId)}>edit</Typography>
                      </Box>
                    )}
                    {/* Confirmation Dialog */}
                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                      <DialogTitle>Delete Review</DialogTitle>
                      <DialogContent>
                        <Typography>Are you sure want to delete this review?</Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button onClick={() => handleDelete(review.reviewId)} color="error" autoFocus>
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                ))
              }

            </Box>
          </Box>
          <Box>

            <Button onClick={handleReview}>write a review</Button>

            <Box sx={{ maxWidth: "250px" }}>
              {
                showTextField &&
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="rating-label">Rating</InputLabel>
                    <Select
                      labelId="rating-label"
                      label="Rating"
                      name="rating"
                      onChange={(e) => handleChange(e)}
                    >
                      <MenuItem value="good">Good</MenuItem>
                      <MenuItem value="excellent">Excellent</MenuItem>
                      <MenuItem value="average">Average</MenuItem>
                      <MenuItem value="poor">Poor</MenuItem>
                      <MenuItem value="worst">Worst</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    multiline
                    rows={4}
                    label=""
                    variant="outlined"
                    fullWidth
                    name='review'
                    onChange={(e) => handleChange(e)}
                  />
                  <Button onClick={handleReviewSubmit}>submit</Button>
                </Box>
              }
            </Box>
          </Box>

        </div>


        <div className="selectRoom">
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell>Rooms</TableCell>
                <TableCell>Amenities</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details?.rooms && details.rooms.map((room) => {
                if (room.numberOfRooms >= search.options.room) {
                  return (
                    <TableRow key={room._id}>
                      <TableCell>
                        <div className="roomDetailsContainer">
                          <Typography variant="h5">{room.roomType}</Typography>
                          <div className="roomImgcontainer" style={{ width: '100%' }}>
                            <Carousel className="carousel">
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
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="roomFeaturesContainer">
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                            <Bed />
                            <CompareArrows />
                          </Box>
                          <Typography variant="body1" style={{ marginBottom: '10px' }}>{room.roomDesc}</Typography>
                          <Typography variant="body1">{room.amenities}</Typography>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="selectContainer">
                          <Typography variant="body1">₹ {room.price}</Typography>
                          <Button onClick={() => handleBooking(room._id)}>Select Room</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                }
                return null;
              })}
            </TableBody>
          </Table>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </div>


      <MailList />
    </div>
  )
}

export default Hotel;