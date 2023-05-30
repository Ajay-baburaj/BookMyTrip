
import React from 'react'
import { Navbar } from 'react-bootstrap'
import "./login.css"
import GoogleIcon from '@mui/icons-material/Google';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { forgetUrl, loginUrl, validateMobileURL } from '../../utils/APIRoutes';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { provider, auth } from '../../firebase/config'
import { signInWithPopup } from "firebase/auth";
import { useDispatch,} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import SnackBar from '../../components/SnackBar';
import { useCookies } from 'react-cookie';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
};

function Login() {
  
  const [values, setValues] = useState({
    email: "",
    password: ""
  })
  
  
  const [forgotEmail, setForgotEmail] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [cookies, setCookie] = useCookies();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false)

  const [mobileForOtp, setMobileForOtp] = useState("")
  const [otpMobileErr, setMobileErr] = useState("");

  const [success,setSuccess] = useState(false)
  const [failure,setFailure] = useState(false)

 
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: ""
  })

  const validateForm = () => {
    const { email, password } = values
    if (email === "") {
      setErrors({
        ["emailError"]: "email required"
      })
      return false;
    } else if (password === "") {
      setErrors({
        ["passwordError"]: "password required"
      })
      return false;
    }
    if (password.length < 6) {
      setErrors({
        ["passwordError"]: "enter valid password"
      })
      return false;
    }
    return true;
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

  const toastOptions = {
    position: "top-center",
    autoclose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light"
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = values;
    if (validateForm()) {
      const { data } = await axios.post(loginUrl, { email, password },{withCredentials:true})
      if (data.status === false) {
        if (data.inValidMail) {
          setErrors({
            ...errors,
            ["emailError"]: data.msg
          })
        } if (data.inValidPassword) {
          setErrors({
            ...errors,
            ["passwordError"]: data.msg
          })
        }

      }
      if (data.status === true) {
        dispatch({
          type: "LOGIN",
          payload: data.userCheck,
        })
        setCookie('accessToken',data?.accesToken)
        setCookie('refreshToken',data?.refreshToken)

        navigate('/')
      }
    }
  }

  const handleMobileForm = async (e) => {
    e.preventDefault()
    if (validateMobile()) {
      await axios.post(validateMobileURL, { mobileForOtp }).then((response) => {
        if (response.data.status) {
          toast.error("otp sent successfully", toastOptions)
          navigate(`/otp/enter/${response.data.mobile}`)
        }
      })
    }
  }

  const validateForgotEmail = () => {
    if (forgotEmail === "") {
      toast.error("enter email", toastOptions)
      return false;
    }
    return true
  }

  const handleEmailForm = (e) => {
    e.preventDefault()
  if (validateForgotEmail()) {
      axios.post(forgetUrl, { forgotEmail }).then((response) => {
        if(response.data.status){
          setSuccess(true)
          handleClose()
        }else{
          setFailure(true)
        }
        
      })
    }
  }

 const handleGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
        const userDetails = {
            username: data.user.displayName,
            email: data.user.email
        }
        console.log(userDetails)
        dispatch({
            type: "GOOGLE LOGIN",
            payload: userDetails
        })
        console.log(data)
        navigate("/")
    }).catch((err) => {
        console.log(err)
    })
}



  return (
    <div>
      <Navbar type="list" />
      <div className="loginWrapper">
        <Box display="flex"
          flexDirection={"column"}
          maxWidth={500}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={10}
          borderRadius={5}
        >
          <div className='loginDetails'>
            <h1 className='loginHeading'>sign in here</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="inputWrapper">
                <TextField type="text"
                  name="email"
                  label="email"
                  helperText={errors.emailError ? errors.emailError : ""}
                  error={errors.emailError ? true : false}
                  required
                  onChange={(e) => handleChange(e)}
                  onFocus={()=>setErrors({...errors,["emailError"]:""})}></TextField>
                <TextField type="password"
                  name="password"
                  label="password"
                  required
                  helperText={errors.passwordError ? errors.passwordError : ""}
                  error={errors.passwordError ? true : false}
                  onChange={(e) => handleChange(e)}
                  onFocus={()=>setErrors({...errors,["passwordError"]:""})}></TextField>
                <button className='loginBtn' type='submit'>continue with email</button>
                <Typography sx={{ fontWeight: "10px", color: "blue" }} onClick={handleOpen}>forgot password ? click here</Typography>
                <br />
                <div className="loginIconWrapper">
                  <div className="loginIcons">
                    <GoogleIcon onClick={handleGoogle}></GoogleIcon>
                    <TabletAndroidIcon className="icon" onClick={handleOpen1}></TabletAndroidIcon>
                  </div>
                  <span className="singInG">
                    sign in other options
                  </span>
                  <br />
                  <span className='signInText'>
                    By signing in or creating an account, you agree with our Terms & conditions and Privacy statement
                  </span>
                </div>
              </div>
            </form>
          </div>
          {success &&<SnackBar text={"Reset link send successfully to your mail"} color={"success"}/> }
           {failure &&<SnackBar text={"please enter registered email"} color={"error"}/> }
        </Box>
      </div>


      {/* -------------------forgot--password---------------- */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleEmailForm}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter registerd email
            </Typography>
            <InputField formLabel=""
              label="email"
              name="forgotEmail"
              type="email"
              // helperText={errors.emailError ? errors.emailError : ""}
              // error={errors.emailError ? true : false}
              callback={(e) => setForgotEmail(e.target.value)}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button type='submit' variant="contained">submit</Button>
            </Box>
          </form>
        </Box>
      </Modal>
      {/* --------------------login-with-otp------------------- */}
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
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button type='submit' variant="contained">submit</Button>
            </Box>
          </form>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default Login