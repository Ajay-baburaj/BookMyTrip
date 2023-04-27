import React, { useState,useEffect} from 'react'
import InputField from '../../components/InputField';
import { Box, Grid, TextField, FormLabel, Typography, Button, Modal } from '@mui/material';
import { ToastContainer, toast } from "react-toastify"
import axios from 'axios'
import { sendOtpURL } from '../../utils/APIRoutes'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import {validateMobileURL} from '../../utils/APIRoutes'

function OtpEnter() {
  const { mobile } = useParams()
  const [otp, setOtp] = useState()
  const [otpErr, setOtpErr] = useState("")
  const [counter, setCounter] = useState(30);
 
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const toastOptions = {
    position: "top-center",
    autoclose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light"
  }

  const validateOtp = () => {
    if (otp.length < 6) {
      setOtpErr("enter valid otp")
      return false
    }
    return true;
  }


  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);



  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateOtp()) {
      await axios.post(sendOtpURL, { mobile, otp }).then((response) => {
        if (response.data.status) {
          dispatch({
            type: "SIGNIN_WITH_OTP",
            payload: response.data.user
          })
          navigate('/')
        } else {
          setOtpErr(response.data.msg)
        }
      })
    }
  }

  const resendOtpLink = async()=>{
    try{
      await axios.post(validateMobileURL, {mobileForOtp: mobile }).then((response) => {
        if (response.data.status) {
          toast.error("otp sent successfully", toastOptions)
        }
      })
    }catch(err){
      alert(err.message)
    }
  }


  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", padding: "8%" }}>
      <Box>
        <Grid>
          <Grid sm={10} md={6} sx={{ boxShadow: 3, maxHeight: "500px", maxWidth: "500px", padding: "4rem" }}>
            <Typography sx={{ textAlign: "center", color: "#7d3434" }}>otp has sent to {mobile}</Typography>
            <Typography sx={{ textAlign: "center", fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>Enter otp</Typography>
            <form onSubmit={handleSubmit}>
              <InputField formLabel=""
                label="otp"
                name="otp"
                type="number"
                helperText={otpErr ? otpErr : ""}
                error={otpErr ? true : false}
                callback={(e) => setOtp(e.target.value)}  />
              <Box sx={{ display: "flex", justifyContent: "center",flexDirection:'column' }}>
              {
                counter > 0 ? <p style={{color:"red",textAlign:'center'}}>resend otp in 00:{counter}</p> : <Button varaint="contained" onClick={resendOtpLink}>Resend otp</Button>

              }

                <Button type='submit' variant="contained">submit</Button>

              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer/>
    </Box>
  )
}

export default OtpEnter