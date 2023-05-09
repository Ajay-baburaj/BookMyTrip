import React from 'react'
import axios from "axios"
import { Box, Grid, Typography, Button, Modal } from '@mui/material';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import InputField from '../../components/InputField';
import { forgotPassword, loginUrl } from '../../utils/ApiRoutesAdmin';
import SnackBar from '../../components/SnackBar';
import { useDispatch } from 'react-redux';


function AdminLogin() {

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: ""
  })

  const [forgotEmail, setForgotEmail] = useState("")

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })

  }

  const handleForgotEmail = (e) => {
    setForgotEmail(e.target.value)
  }

  const handleSubmit = (e) => {
    const { email, password } = values
    e.preventDefault()
    if (handleError()) {

      axios.post(loginUrl, { email, password },{withCredentials:true}).then((response) => {

        console.log(response.data)
        if (response.data.status) {
          dispatch({
            type:"ADMIN_LOGIN",
            payload:{
              email:response.data.user
            }
          })
          navigate("/admin")
        }else{
          if(response.data.passwordStatus== false){
            setErrors({...errors,["passwordError"]:response.data.msg})
          }else{
            setErrors({...errors,["emailError"]:response.data.msg})
          }
        }
      })
    }
  }

  const emailValidation = () => {
    if (forgotEmail === "") {
      setErrors({
        ["emailError"]: "email is required"
      })
      return false;
    }
    return true;
  }

  const handleForm = (e) => {
    e.preventDefault()
    if (emailValidation()) {
      axios.post(forgotPassword, { forgotEmail }).then((response) => {
        console.log(response)
        if (response.data.status) {
          setSuccess(true)
          handleClose()
        } else {
          setFailure(true)
        }
      })
    }
  }

  const handleError = () => {
    const { email, password } = values
    if (email === "" && password === "") {
      setErrors({
        ["emailError"]: "email is required",
        ["passwordError"]: "password is required"
      })
      return false;
    }
    if (email === "") {
      setErrors({
        ["emailError"]: "email is required"
      })
      return false;
    }
    if (password === "") {
      setErrors({
        ["passwordError"]: "password is required"
      })
      return false;
    }
    return true;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", padding: "8%" }}>
      <Box>
        <Grid>
          <Grid sm={10} md={6} sx={{ boxShadow: 3, maxHeight: "500px", maxWidth: "500px", padding: "4rem" }}>
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

              <Box sx={{ display: "flex", justifyContent: "center", cursor: "pointer" }}>
                <Button type='submit' variant="outlined">Login</Button>

              </Box>
              <Typography sx={{ fontSize: "12px", textAlign: "center", marginTop: "15px", color: "blue", cursor: "pointer" }} >forgot password <span
                onClick={handleOpen} >click here</span></Typography>
            </form>
            {success && <SnackBar text={"Reset link send successfully to your mail"} color={"success"} />}
            {failure && <SnackBar text={"please enter registered email"} color={"error"} />}

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
                    helperText={errors.emailError ? errors.emailError : ""}
                    error={errors.emailError ? true : false}
                    callback={(e) => handleForgotEmail(e)} />
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button type='submit' variant="contained">submit</Button>

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

export default AdminLogin