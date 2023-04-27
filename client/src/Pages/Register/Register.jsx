import React, { useState } from 'react'
import { Navbar, Toast } from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import "./register.css"
import { Box } from '@mui/material';
import { registerUrl } from '../../utils/APIRoutes';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
// import {Toaster,toast} from 'react-hot-toast'



function Register() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [values, setValues] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const toastOptions = {
    position: "top-right",
    theme: "light",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (handleValidation()) {
      const { username, email, phone, password, confirmPassword } = values

      const { data } = await axios.post(registerUrl, { username, email, phone, password })
      dispatch({
        type: "REGISTER",
        payload: data.user
      })
      toast.success("Registration successfull")
      navigate('/login')
    }
  }

  const user = useSelector(state => state.user)


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleValidation = () => {
    const { username, email, password, confirmPassword, phone } = values

    if (confirmPassword !== password) {
      toast.error("password and confirm password must be same", toastOptions)
      return false;
    } else if (username.length < 3) {
      toast.error("username should be greater than 3 characters", toastOptions)
      return false;
    } else if (email === "") {
      toast.error("email is required", toastOptions)
      return false;
    } else if (password.length < 6) {
      toast.error("password must contain atleat 6 characters", toast)
      return false;
    } else if (phone === "" || phone.length < 10 || phone.length > 10) {

      toast.error("Registraion successfull please login")
      return false;
    }

    return true
  }
  return (
    <>
      <Navbar type="list" />
      <div className="loginWrapper">
        <form onSubmit={(event) => handleSubmit(event)}>
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
              <h1 className='loginHeading'>Register here</h1>
              {/* <form onSubmit={(event)=>handleSubmit(event)}> */}
              <div className="inputWrapper">
                <FormControl>
                  <input type="text" name='username' placeholder='Full name' className='form-control ' onChange={(e) => handleChange(e)} />
                </FormControl>
                <FormControl>
                  <input type="email" name='email' placeholder='email' className='form-control ' onChange={(e) => handleChange(e)} />
                </FormControl>
                <FormControl>
                  <input type="number" name='phone' placeholder='Mobile' className='form-control ' onChange={(e) => handleChange(e)} />
                </FormControl>
                <FormControl>
                  <input type="password" name='password' placeholder='password' className='form-control ' onChange={(e) => handleChange(e)} />
                </FormControl>
                <FormControl>
                  <input type="password" name='confirmPassword' placeholder='confirm password' className='form-control' onChange={(e) => handleChange(e)} />
                </FormControl>
                <button className='loginBtn' type='submit'>Register Now</button>

                <span className='signInText'>
                  By signing in or creating an account, you agree with our Terms & conditions and Privacy statement
                </span>
              </div>

              {/* </form> */}

              
            </div>

          </Box>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Register