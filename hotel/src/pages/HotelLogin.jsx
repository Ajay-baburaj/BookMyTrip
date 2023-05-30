import * as React from 'react';
import axios from "axios"
import { Box, Grid, TextField, FormLabel, Typography, Button, Modal } from '@mui/material';
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, } from 'react-redux';
import { hotelLoginUrl, forgotPasswordUrl, SignInWithOtpUrl } from '../utils/apiRoutesHotel'
import { handleError, emailValidation } from '../validations/loginValidation'
import InputField from '../components/InputField'
import SnackBar from "../components/SnackBar"
import { HOTEL_INFO, HOTEL_LOGIN } from '../reduxStore/hotelSlice';
import {useCookies} from 'react-cookie'

function HotelLogin() {
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #fff',
    boxShadow: 24,
    p: 4,
  };
  
  const dispatch = useDispatch()
  const [cookies, setCookie] = useCookies([]);
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false)

  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const [otpMessage, setOtpMessage] = useState(false)
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: "",
    password: ""
  })

  console.log(values)

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: ""
  })

  const [mobileForOtp, setMobileForOtp] = useState("")
  const [otpMobileErr, setMobileErr] = useState("");


  const [forgotEmail, setForgotEmail] = useState("")
  const [errorsForgot, setErrorsForgot] = useState("")

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })

  }

  const handleForgotEmail = (e) => {
    setForgotEmail(e.target.value)
  }

  const handleSubmit = (e) => {
    const { email, password } = values
    e.preventDefault()
    if (handleError(values, setErrors)) {
      axios.post(hotelLoginUrl, { email, password }, { withCredentials: true }).then(async (response) => {
        console.log("wanted",response)
        if (response.data.status) {
          if (response.data.hotelCheck.isRegistered === true) {
            dispatch(HOTEL_INFO(response.data.hotelCheck))
            setCookie('jwt',response?.data?.token)
            navigate("/hotel/profile")
          } else {
            dispatch(HOTEL_LOGIN(response.data.hotelCheck))
            setCookie('jwt',response?.data?.token)
            navigate('/hotel/info')
          }
        } else {
          if (response.data.passwordError) {
            setErrors({
              ...errors, ["passwordError"]: response.data.msg,
            })
          }
          if (response.data.emailError) {
            setErrors({
              ...errors, ["emailError"]: response.data.msg,
            })
          }
        }

      })
    }
  }

  const validateMobile = () => {
    if (mobileForOtp == "") {
      setMobileErr("Enter mobile")
      return false;
    }
    if (mobileForOtp.length != 10) {
      setMobileErr("enter valid mobile number")
      return false
    }
    return true;
  }

  const handleMobileForm = async (e) => {
    e.preventDefault()
    if (validateMobile()) {
      await axios.post(SignInWithOtpUrl, { mobileForOtp }).then((response) => {
        if (response.data.status) {
          setOtpMessage(true)
          setTimeout(() => {
            navigate(`/hotel/otp/${response.data.mobile}`)
          }, 1000)

        } else {
          setMobileErr(response.data.msg)
        }
      })
    }
  }

  const handleForm = (e) => {
    e.preventDefault()
    if (emailValidation(forgotEmail, setErrorsForgot)) {
      axios.post(forgotPasswordUrl, { forgotEmail }).then((response) => {
        if (response.data.status) {
          setSuccess(true)
          handleClose()
        } else {
          setFailure(true)

        }

      })
    }
  }




  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", padding: "8%" }}>
      <Box>
        <Grid>
          <Grid sm={10} md={6} sx={{ boxShadow: 3, maxHeight: "500px", maxWidth: "500px", padding: "4rem" }}>
            <Typography sx={{ textAlign: "center", fontSize: "20px", fontWeight: "200", marginBottom: "15px" }}>Hotelside login</Typography>
            <Typography sx={{ textAlign: "center", fontSize: "32px", fontWeight: "bolder", marginBottom: "15px" }}>bookMyTrip</Typography>
            <form onSubmit={handleSubmit}>
              <InputField formLabel=""
                label="email"
                name="email"
                type="email"
                helperText={errors.emailError ? errors.emailError : ""}
                error={errors.emailError ? true : false}
                callback={(e) => handleChange(e)}
                onFocusCallback={() => setErrors({ ...errors, ["emailError"]: "" })} />
              <InputField FormLabel="password"
                label="password"
                name="password"
                type="password"
                helperText={errors.passwordError ? errors.passwordError : ""}
                error={errors.passwordError ? true : false}
                callback={(e) => handleChange(e)}
                onFocusCallback={() => setErrors({ ...errors, ["passwordError"]: "" })} />

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button type='submit' variant="outlined">Login</Button>

              </Box>
            </form>
            <Box sx={{ marginTop: "10px", display: 'flex', justifyContent: "center" }}>
              <Button variant="outlined" color="secondary" onClick={handleOpen1}>Log in with OTP</Button>
            </Box>
            <Typography sx={{ fontSize: "12px", textAlign: "center", marginTop: "15px", color: "blue", cursor: "pointer" }} >forgot password <span
              onClick={handleOpen} >click here</span></Typography>
            { }
            {success && <SnackBar text={"Reset link send successfully to your mail"} color={"success"} />}
            {failure && <SnackBar text={"please enter registered email"} color={"error"} />}
            {otpMessage && <SnackBar text={"otp sent successfully"} color={"success"} />}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form onSubmit={handleForm}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Enter registerd email
                  </Typography>
                  <InputField formLabel=""
                    label="email"
                    name="forgotEmail"
                    type="email"
                    helperText={errorsForgot ? errorsForgot : ""}
                    error={errorsForgot ? true : false}
                    callback={(e) => handleForgotEmail(e)}
                    onFocusCallback={errorsForgot ? "" : ""} />
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button type='submit' variant="contained">submit</Button>

                  </Box>
                </form>
              </Box>
            </Modal>
            {/* ------------------login with otp----------------------- */}
            <Modal
              open={open1}
              onClose={handleClose1}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form onSubmit={handleMobileForm}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Enter registered mobile number
                  </Typography>
                  <InputField formLabel=""
                    label="mobile number"
                    name="mobileForOtp"
                    type="number"
                    helperText={otpMobileErr ? otpMobileErr : ""}
                    error={otpMobileErr ? true : false}
                    callback={(e) => { setMobileForOtp(e.target.value) }}
                    onFocusCallback={() => setMobileErr("")}
                  />
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button type='submit' variant="outlined">submit</Button>
                  </Box>
                </form>
              </Box>
            </Modal>

          </Grid>
        </Grid>
      </Box>
    </Box>

  );

}

export default HotelLogin