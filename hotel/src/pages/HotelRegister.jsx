import * as React from 'react';
import axios from "axios"
import { Box, Grid, TextField, FormLabel, Typography, Button, Modal } from '@mui/material';
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { hotelLoginUrl, hotelRegister } from '../utils/apiRoutesHotel'
import InputField from '../components/InputField'
import { handleError } from '../validations/registerValidator';
import {toast,Toaster} from 'react-hot-toast'

function HotelRegister() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ name: "", email: "", password: "", phone: "", street: "", landmark: "", city: "", pincode: "", confirmPassword: "" })
    const [errors, setErrors] = useState({
        nameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
        streetNameError: "",
        pincodeError: "",
        phoneError: "",
        landmarkError: "",
        cityError: ""
    })

    const [forgotEmail, setForgotEmail] = useState("")

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })

    }

    const handleForgotEmail = (e) => {
        setForgotEmail(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (handleError(values, setErrors)) {
            console.log("call is coming hre")
           await axios.post(hotelRegister,values)
                .then(response => {
                   if(response.data.status){
                    toast.success('Registration Successfull')
                    setTimeout(()=>{
                        navigate("/hotel/login")
                    },1000)
                   }
                })
                .catch(error => {
                    console.log(error.message);
                });
        }

    }


    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", padding: "5%" }}>
                <Box>
                    <Grid>
                        <Grid sm={10} md={6} sx={{ boxShadow: 3, maxHeight: "1000px", maxWidth: "700px", padding: "4rem" }}>
                            <Typography sx={{ textAlign: "center", fontSize: "20px", fontWeight: "200", marginBottom: "15px" }}>Hotelside Register</Typography>
                            <Typography sx={{ textAlign: "center", fontSize: "32px", fontWeight: "bolder", marginBottom: "15px" }}>bookMyTrip</Typography>
                            <form onSubmit={handleSubmit}>
                                <InputField formLabel=""
                                    label="hotel name"
                                    name="name"
                                    type="text"
                                    helperText={errors.nameError ? errors.nameError : ""}
                                    error={errors.nameError ? true : false}
                                    callback={(e) => handleChange(e)}
                                    onFocusCallback={() => setErrors(errors.nameError ? errors.nameError : "")} />
                                <InputField formLabel=""
                                    label="email"
                                    name="email"
                                    type="email"
                                    helperText={errors.emailError ? errors.emailError : ""}
                                    error={errors.emailError ? true : false}
                                    callback={(e) => handleChange(e)}
                                    onFocusCallback={(e) => setErrors(errors.emailError ? errors.emailError : "")} />
                                <InputField formLabel=""
                                    label="phone"
                                    name="phone"
                                    type="number"
                                    helperText={errors.phoneError ? errors.phoneError : ""}
                                    error={errors.phoneError ? true : false}
                                    callback={(e) => handleChange(e)}
                                    onFocusCallback={(e) => setErrors(errors.phoneError ? errors.phoneError : "")} />
                                <InputField FormLabel=""
                                    label="Street Name "
                                    name="street"
                                    type="text"
                                    helperText={errors.streetNameError ? errors.streetNameError : ""}
                                    error={errors.streetNameError ? true : false}
                                    callback={(e) => handleChange(e)}
                                    onFocusCallback={() => setErrors(errors.streetNameError ? errors.streetNameError : "")} />
                                <InputField FormLabel=""
                                    label="landmark"
                                    name="landmark"
                                    type="text"
                                    helperText={errors.landmarkError ? errors.landmarkError : ""}
                                    error={errors.landmarkError ? true : false}
                                    callback={(e) => handleChange(e)}
                                    onFocusCallback={() => setErrors(errors.landmarkError ? errors.landmarkError : "")} />
                                <InputField FormLabel=""
                                    label="city"
                                    name="city"
                                    type="text"
                                    helperText={errors.cityError ? errors.cityError : ""}
                                    error={errors.cityError ? true : false}
                                    callback={(e) => handleChange(e)}
                                    onFocusCallback={() => setErrors(errors.cityError ? errors.cityError : "")} />
                                <InputField
                                    formLabel="" // change FormLabel to formLabel
                                    label="pincode"
                                    name="pincode"
                                    type="number"
                                    helperText={errors.pincodeError ? errors.pincodeError : ""}
                                    error={errors.pincodeError ? true : false}
                                    callback={(e) => handleChange(e)}
                                    onFocusCallback={() => setErrors(errors.pincodeError ? errors.pincodeError : "")}
                                     />
                                <InputField FormLabel=""
                                    label="password"
                                    name="password"
                                    type="password"
                                    helperText={errors.passwordError ? errors.passwordError : ""}
                                    error={errors.passwordError ? true : false}
                                    callback={(e) => handleChange(e)}
                                    onFocusCallback={() => setErrors(errors.passwordError ? errors.passwordError : "")} />
                                <InputField FormLabel=""
                                    label="confirm password"
                                    name="confirmPassword"
                                    type="password"
                                    helperText={errors.confirmPasswordError ? errors.confirmPasswordError : ""}
                                    error={errors.confirmPasswordError ? true : false}
                                    callback={(e) => handleChange(e)}
                                    onFocusCallback={() => setErrors(errors.confirmPasswordError ? errors.confirmPasswordError : "")} />
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <Button type='submit' variant="contained">Register</Button>

                                </Box>
                                <Typography sx={{ textAlign: "center", marginTop: "15px", color: "blue", cursor: "pointer" }} onClick={() => navigate('/hotel/login')} >already registered click here</Typography>
                            </form>
                        </Grid>
                    </Grid>
                </Box>
                <Toaster position="top-center"reverseOrder={false}/>
            </Box>

        </>
    )
}

export default HotelRegister