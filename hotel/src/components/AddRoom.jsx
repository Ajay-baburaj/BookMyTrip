import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, TextField, FormControl, FormLabel, Button } from '@mui/material';
import { deleteRoomImage, hotelRoomDetailsSubmit, hotelRoomEditSubmit } from '../utils/apiRoutesHotel'
import { handleError } from "../validations/validateRooms"
import InputField from '../components/InputField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';
import SnackBar from '../components/SnackBar'
import { useCookies } from 'react-cookie';
import { ImageContent } from './ImageComponent/ImageContent';
import { toast, Toaster } from 'react-hot-toast'


function AddRoom(props) {
    const [image, setImage] = useState([])
    const [added, setAdded] = useState(false)
    const [manageImg,setManageImg] = useState(false)
    const [cookies, removeCookie, setCookie] = useCookies(['jwt'])
    const [token, setToken] = useState(cookies?.jwt)
    const [editData, setEditData] = useState(false)
    const [data, setData] = useState({ roomType: "", roomDesc: "", numberOfRooms: 0, price: 0, amenities: "" })
    const navigate = useNavigate()
    const [manageDlt,setManageDlt] = useState(false)

    useEffect(() => {
        if (props.roomData) {
            const { roomType, roomDesc, numberOfRooms, amenities, price,_id} = props?.roomData;
            setData({ roomType, roomDesc, numberOfRooms, amenities, price,_id})
            const img = props.roomData.images;
            setImage(img)
        }
    }, [props.roomData,manageDlt])


    const hotel = useSelector(state => state.hotel.hotel)
    const [errors, setErrors] = useState({
        roomTypeError: "",
        roomDescError: "",
        numberOfRoomsError: "",
        AmenitiesError: "",
        priceError: ""
    })


    const handleChange = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (handleError(data, setErrors)) {
            const { roomType, roomDesc, numberOfRooms, price, amenities } = data
            const formdata = new FormData()
            image.forEach(image => {
                formdata.append("images", image)
            })
            formdata.append("email", hotel.email)
            formdata.append("roomType", roomType)
            formdata.append("roomDesc", roomDesc)
            formdata.append("numberOfRooms", numberOfRooms)
            formdata.append("price", price)
            formdata.append("amenities", amenities)

            if (props.edit) {
                axios.post(hotelRoomEditSubmit, formdata, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    },
                }).then((response) => {
                    if (response.data.status) {
                        toast('Edit successfull!',
                            {
                                style: {
                                    borderRadius: '10px',
                                    background: '#333',
                                    color: '#fff',
                                },
                            }
                        );
                        navigate("/hotel/rooms")
                    }
                })
            } else {
                axios.post(hotelRoomDetailsSubmit, formdata, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    },
                }).then((response) => {
                    if (response.data.status) {
                        toast('Edit successfull!',
                            {
                                style: {
                                    borderRadius: '10px',
                                    background: '#333',
                                    color: '#fff',
                                },
                            }
                        )
                        props.callback(true)
                        navigate("/hotel/rooms")
                    }
                })
            }
        }
    }

    useEffect(() => {
        if (added) {
            setTimeout(() => {
                setAdded(false)
            }, 1000)
        }
        if (editData) {
            setTimeout(() => {
                setEditData(false)
            }, 1000)
        }
    }, [added, editData])

    useEffect(()=>{
        
    },[manageImg])

    const handleImage = (e) => {
        const updatedImages = Array.from(e.target.files);
        console.log(updatedImages)
        setImage((prev) => [...prev, ...updatedImages]);
    };


    const handleRemoveImage = (index) => {
        setImage((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const deleteImg = async(index,roomId,hotelId) => {
       if(typeof image[index]== 'string'){
        alert(image[index])
           await axios.delete(`${deleteRoomImage}/?index=${index}&hotelId=${hotelId}&roomId=${roomId}`,{
               headers:{
                   withCredentails:true,
                   'Authorization':`Bearer ${token}`
                }
            }).then((response)=>{
                setManageImg(!manageImg)
                props.deleteFn()
                setManageDlt(!manageDlt)
                console.log(response)
            }).catch((err)=>{
                alert(err.message)
            })

       }else{
        const newImages = [...image];
        newImages.splice(index, 1);
        setImage(newImages);
       }


    }



    return (
        <Box>
            <Typography sx={{ fontSize: "32px", fontWeight: "bold", textAlign: "center", marginTop: "4rem" }}>Enter Room Details</Typography>
            <form onSubmit={(event) => handleSubmit(event)} encType='multipart/form-data'>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                        <Box>
                            <InputField formLabel=""
                                label="Room type"
                                name="roomType"
                                type="text"
                                helperText={errors.roomTypeError ? errors.roomTypeError : ""}
                                error={errors.roomTypeError ? true : false}
                                defaultValue={data.roomType ? data.roomType : ""}
                                callback={(e) => handleChange(e)}
                                onFocusCallback={() => setErrors({ ...errors, ["roomTypeError"]: "" })} />
                            <FormControl fullWidth>
                                <TextField
                                    formLabel=""
                                    label="Enter Room Description"
                                    name="roomDesc"
                                    rows={4}
                                    multiline
                                    defaultValue={data.roomDesc ? data.roomDesc : ""}
                                    helperText={errors.roomDescError ? errors.roomDescError : ""}
                                    error={errors.roomDescError ? true : false}
                                    onChange={(e) => handleChange(e)}
                                    onFocus={() => setErrors({ ...errors, ["roomDescError"]: "" })}
                                />
                            </FormControl>
                            <InputField formLabel=""
                                label="Number"
                                name="numberOfRooms"
                                type="number"
                                defaultValue={data.numberOfRooms ? data.numberOfRooms : ""}
                                helperText={errors.numberOfRoomsError ? errors.numberOfRoomsError : ""}
                                error={errors.numberOfRoomsError ? true : false}
                                callback={(e) => handleChange(e)}
                                onFocusCallback={() => setErrors({ ...errors, ["numberOfRoomsError"]: "" })} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Box>
                            <FormControl fullWidth sx={{ marginTop: "12px" }}>
                                <TextField
                                    label="Enter Ameneties"
                                    rows={4}
                                    name="amenities"
                                    multiline
                                    defaultValue={data.amenities ? data.amenities : ""}
                                    helperText={errors.AmenitiesError ? errors.AmenitiesError : ""}
                                    error={errors.AmenitiesError ? true : false}
                                    onChange={(e) => handleChange(e)}
                                    onFocus={() => setErrors({ ...errors, ["AmenitiesError"]: "" })}
                                />
                            </FormControl>
                            <InputField formLabel=""
                                label="price"
                                name="price"
                                type="number"
                                defaultValue={data.price ? parseInt(data.price) : ""}
                                helperText={errors.priceError ? errors.priceError : ""}
                                error={errors.priceError ? true : false}
                                callback={(e) => handleChange(e)}
                                onFocusCallback={() => setErrors({ ...errors, ["priceError"]: "" })} />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={10} lg={10} sx={{ gap: 5 }}>
                        <FormLabel sx={{ marginBottom: "1rem" }}>Room Image</FormLabel>
                        <Box sx={{ display: 'flex', gap: "10px", marginTop: "1rem" }}>
                            {image.map((imageUrl, index) => (

                                <ImageContent img={imageUrl} clickFunction={()=>deleteImg(index,data._id,hotel._id)} />

                            ))}

                        </Box>
                        <FormControl>
                            <FormControl>
                                <input type='file' multiple onChange={handleImage} name="image">
                                </input>
                            </FormControl>
                        </FormControl>
                        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "10px", cursor: "pointer" }}>
                            {
                                props.edit ? <Button variant="contained" type="submit" >submit</Button> : <Button variant="contained" type="submit" >Add Room</Button>
                            }

                        </Box>
                    </Grid>

                </Grid>
            </form>
            <Toaster position="top-center" reverseOrder={false}
/>
        </Box>
    )
}

export default AddRoom
