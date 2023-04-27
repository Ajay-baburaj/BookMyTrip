import React, { useEffect, useState } from 'react'
import InputField from '../components/InputField';
import { Box, Grid, Typography, Button} from '@mui/material';
import axios from 'axios'
import { SignInWithOtpUrl, otpverifyUrl } from '../utils/apiRoutesHotel'
import { useParams } from "react-router-dom"
import { useDispatch,  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SIGNIN_WITH_OTP } from '../reduxStore/hotelSlice';
import {toast,Toaster} from 'react-hot-toast'

function OtpEnter() {
  const { mobile } = useParams()
  const [otp, setOtp] = useState("")
  const [otpErr, setOtpErr] = useState("")
  const [counter, setCounter] = useState(30);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const validateOtp = () => {
    if(otp === ""){
      setOtpErr("enter otp")
      return false
    }
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
      await axios.post(otpverifyUrl, { mobile, otp }).then((response) => {
        if (response.data.status) {
          dispatch(SIGNIN_WITH_OTP(response.data.user))
          navigate('/')
        } else {
          setOtpErr(response.data.msg)
        }
      })
    }

  }

  const resendOtpLink = async()=>{
    try{
      await axios.post(SignInWithOtpUrl, {mobileForOtp: mobile }).then((response) => {
        if (response.data.status) {
          toast.success("otp sent successfully")
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
                callback={(e) => setOtp(e.target.value)}  
                onFocusCallback={()=>setOtpErr('')}/>
              <Box sx={{ display: "flex", justifyContent: "center",flexDirection:'column' }}>
              {
                counter > 0 ? <p style={{color:"red",textAlign:'center'}}>resend otp in 00:{counter}</p> : <Button varaint="contained" onClick={resendOtpLink}>Resend otp</Button>

              }

                <Button type='submit' variant="outlined">submit</Button>
              </Box>
            </form>

          </Grid>
        </Grid>
      </Box>
      <Toaster position="top-center"reverseOrder={false}/>
    </Box>
  )
}

export default OtpEnter