import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography, TextField, FormControl, FormLabel, Button } from '@mui/material';
import InputField from '../components/InputField';
import { handleError } from '../validations/infoValidation'
import axios from "axios"
import { hotelInfoSubmit, getDataUrl, deletePhotoUrl } from '../utils/apiRoutesHotel'
import { useNavigate } from 'react-router-dom'
import SnackBar from '../components/SnackBar';
import { HOTEL_INFO } from '../reduxStore/hotelSlice';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie'
import { ImageContent } from '../components/ImageComponent/ImageContent';
import {toast,Toaster} from 'react-hot-toast'





function Info() {

  const [cookies, removeCookie, setCookie] = useCookies(['jwt'])
  const [token,setToken] = useState(cookies?.jwt)
  const [manageImg,setManageImg] = useState(false)

  const user = useSelector(state => state.hotel?.hotel)
  const [data, setData] = useState({ name: user?.name, email: user?.email, description: user?.description, phone: user?.phone, street: user?.street, landmark: user?.landmark, city: user?.city, pincode: user?.pincode })


  const [image, setImage] = useState([]);
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const dispatch = useDispatch()



  useEffect(() => {
    fetchHotel()
  }, [manageImg])


  

  const fetchHotel = async () => {
    const response = await axios.get(getDataUrl + `/${data?.email}`, {
      headers: {
        withCredentials: true,
        'Authorization': `Bearer ${token}`
      }
    })


    if (response) {
      console.log(response.data)
      dispatch(HOTEL_INFO(response.data.hotelData))
    }
    if (response.data.hotelData.hotelImage) {
      setImage(response.data.hotelData.hotelImage)
    } else {
      setImage([])
    }

  }




  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    streetNameError: "",
    pincodeError: "",
    phoneError: "",
    landmarkError: "",
    cityError: "",
    hotelDescError: ""
  })




  const handleImage = (e) => {
    const updatedImages = Array.from(e.target.files)
    setImage((prev) => [...prev, ...updatedImages])
  }

  const handleDelete = (idx,id)=>{
    if(typeof image[idx] == 'string'){
      axios.put(`${deletePhotoUrl}/?index=${idx}&id=${id}&hotelId=${user?._id}`,{},{
        headers:{
          "Authorization":`Bearer ${token}`,
          withCredentials:true,
        }
      }).then((response)=>{
        setManageImg(!manageImg)
      })

    }else{
      const newImages = [...image];
      newImages.splice(idx, 1);
      setImage(newImages);
    }
  }
  useEffect(()=>{

  },[image,manageImg])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleError(data, setErrors)) {
      console.log(data);
      const formdata = new FormData()

      image.forEach(image => {
        formdata.append("images", image)
      })
      formdata.append("name", data.name)
      formdata.append("email", data.email)
      formdata.append("phone", data.phone)
      formdata.append("address", data.address)
      formdata.append("description", data.description)
      axios.post(hotelInfoSubmit, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
          
        },
      }).then((response) => {
        if (response.data.status) {
          if (response.data.hotelDetails?.isRegistered) {
            alert(response.data.hotelDetails?.isRegistered)
           toast("Successfully Submitted",{
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
          } else {
            toast.success("Successfully Submitted Now add rooms",{
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
            setTimeout(()=>{
              navigate("/hotel/rooms")
            },3000)
          }
        } else {
          alert("error occured, please fill again")
        }
      }).catch((err) => {
        console.log(err)
      })
    }

  }

  useEffect(() => {
    setTimeout(() => {
      if (success) {
        setSuccess(!success)
      }
    }, 1000)
  }, [success])

  const handleChange = (e) => {
    setData({
      ...data, [e.target.name]: e.target.value
    })
  }




  return (
    <Box sx={{ paddingLeft: "10rem", paddingRight: "10rem", paddingBottom: "10rem" }}>
      <Typography sx={{ fontSize: "32px", fontWeight: "bold", textAlign: "center", marginTop: "4rem" }}>Hotel Information</Typography>
      <form onSubmit={(event) => handleSubmit(event)} encType='multipart/form-data'>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <Box>
              <InputField formLabel=""
                label="hotel name"
                name="name"
                defaultValue={data?.name}
                type="text"
                helperText={errors.nameError ? errors.nameError : ""}
                error={errors.nameError ? true : false}
                callback={(e) => handleChange(e)}
                onFocusCallback={() => setErrors(errors.nameError ? errors.nameError : "")} />
              <InputField formLabel=""
                label="email"
                name="email"
                type="email"
                defaultValue={data?.email}
                helperText={errors.emailError ? errors.emailError : ""}
                error={errors.emailError ? true : false}
                callback={(e) => handleChange(e)}
                onFocusCallback={(e) => setErrors(errors.emailError ? errors.emailError : "")} />
              <InputField formLabel=""
                label="phone"
                name="phone"
                type="number"
                defaultValue={data?.phone}
                helperText={errors.phoneError ? errors.phoneError : ""}
                error={errors.phoneError ? true : false}
                callback={(e) => handleChange(e)}
                onFocusCallback={(e) => setErrors(errors.phoneError ? errors.phoneError : "")} />
              <FormControl fullWidth>
                <TextField
                  formLabel="Hotel Description"
                  label="description"
                  name="description"
                  rows={4}
                  multiline
                  defaultValue={data?.description}
                  onChange={(e) => handleChange(e)}
                  helperText={errors.hotelDescError ? errors.hotelDescError : ""}
                  error={errors.hotelDescError ? true : false}
                  onFocus={() => setErrors(errors.hotelDescError ? errors.hotelDescError : "")}
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputField FormLabel=""
              label="Street Name "
              name="street"
              type="text"
              helperText={errors.streetNameError ? errors.streetNameError : ""}
              error={errors.streetNameError ? true : false}
              defaultValue={data?.street}
              callback={(e) => handleChange(e)}
              onFocusCallback={() => setErrors(errors.streetNameError ? errors.streetNameError : "")} />
            <InputField FormLabel=""
              label="landmark"
              name="landmark"
              type="text"
              helperText={errors.landmarkError ? errors.landmarkError : ""}
              error={errors.landmarkError ? true : false}
              defaultValue={data?.landmark}
              callback={(e) => handleChange(e)}
              onFocusCallback={() => setErrors(errors.landmarkError ? errors.landmarkError : "")} />
            <InputField FormLabel=""
              label="city"
              name="city"
              type="text"
              helperText={errors.cityError ? errors.cityError : ""}
              error={errors.cityError ? true : false}
              defaultValue={data?.city}
              callback={(e) => handleChange(e)}
              onFocusCallback={() => setErrors(errors.cityError ? errors.cityError : "")} />
            <InputField
              label="pincode"
              name="pincode"
              type="number"
              helperText={errors.pincodeError ? errors.pincodeError : ""}
              error={errors.pincodeError ? true : false}
              defaultValue={data?.pincode}
              callback={(e) => handleChange(e)}
              onFocusCallback={() => setErrors(errors.pincodeError ? errors.pincodeError : "")}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} sx={{ marginTop: "0px" }}>


          </Grid>
          <Grid item xs={12} md={10} lg={10} sx={{ gap: 5 }} >
            <FormLabel sx={{ marginBottom: "1rem" }}>Hotel Image</FormLabel>
            <Box sx={{ marginTop: "2rem", display: "flex", alignItems: "center", maxWidth: "1000px",gap:"20px" }}>

              {image && image.map((img, index) => (
                <ImageContent img={img} clickFunction={()=>handleDelete(index,user._id,img)}/>
              ))}

            </Box>

            <FormControl>
              <input type='file' multiple onChange={handleImage} name="image">
              </input>
            </FormControl>

          </Grid>
        </Grid>
        <Button variant="contained" type='submit' sx={{ marginTop: "2rem" }}>submit here</Button>
      </form>
      {success && <SnackBar text={"successfully submitted"} color={"success"} onch />}

      <Toaster position="top-center" reverseOrder={false}/>
    </Box>
  )
}


export default Info;
