import React, { useState, useEffect } from 'react'
import {
    TextField, Typography, Radio, RadioGroup, FormControlLabel, Box, MenuItem,
    Select, FormControl, InputLabel, Grid, Button, Modal
} from '@mui/material'
import axios from 'axios'

import { useSelector } from 'react-redux'
import { confirmBooking, verifyUrl } from '../utils/APIRoutes'

function BookingForm() {
    const user = useSelector(state => state?.user?.user)
    const hotel = useSelector(state=>state?.booking?.details)
    const [open, setOpen] = React.useState(false);
    const [add, setAdd] = useState(false)
    const [selectedValue, setSelectedValue] = useState('myself')
    const [guest, setGuest] = useState([])
    const [title, setTitle] = useState('Mr')
    const [data, setData] = useState({ firstName: '', lastName: '', email: '', mobile: '' })
    const [errors, setErrors] = useState({ emailErr: '', phoneErr: '',firstNameErr:'',lastNameErr:''})


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        console.log('selectedValue changed: ', selectedValue)
    }, [selectedValue])

    const hanldeAdd = (firstName, lastName) => {
        const guestName = title + " " + firstName + ' ' + lastName
        if (guest.includes(guestName)) {
            alert("guest alreadyu exits")
        } else {
            setGuest([...guest, guestName]);

        }
    }
    useEffect(() => {
        console.log(guest)
    }, [guest])


    const handleOpen = () => {
        setOpen(true)
        setAdd(true)
    }
    const handleClose = () => {
        setOpen(false)
        setAdd(false)
    }
    const handleError = () => {
        const { firstName, lastName, email, phone } = data;
        if (firstName == '') {
            errors.firstNameErr = "Enter First Name"
            return false
        } else if (firstName.length < 3) {
            errors.firstNameErr = "FIrst Name should be more than 3 characters"
            return false
        } else if (lastName == '') {
            errors.lastNameErr = 'Enter Last Name'
            return false
        } else if (lastName.length < 3) {
            errors.lastNameErr = "Last Name should be more than 3 characters"
            return false
        } else if (email == '') {
            errors.emailErr = 'email required'
            return false
        } else if (phone == '') {
            errors.phoneErr = 'phone number required'
            return false
        } else if (phone.legth > 10 || phone.length > 10) {
            errors.phoneErr = 'Invalid Phone number'
            return false;
        }
        return true;
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    // const initPayment =(hotel)=>{
    //     const options = {
	// 		key: "rzp_test_wBILsF6sI8t8aF",
	// 		amount: hotel.amount,
	// 		currency: "INR",
	// 		name:"bookMyTri PVT Limited",
	// 		description: "Test Transaction",
	// 		order_id: hotel._id,
	// 		handler: async (response) => {
	// 			try {
	// 				const { data } = await axios.post(verifyUrl, response);
	// 				console.log(data);
	// 			} catch (error) {
	// 				console.log(error);
	// 			}
	// 		},
	// 		theme: {
	// 			color: "#3399cc",
	// 		},
	// 	};
	// 	const rzp1 = new window.Razorpay(options);
	// 	rzp1.open();
    // }
    
    
    async function displayRazorpay(data) {
        alert(data.id)
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
            );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }


       

        const options = {
            key: "rzp_test_wBILsF6sI8t8aF", // Enter the Key ID generated from the Dashboard
            amount: hotel?.total,
            currency: "INR",
            name: "bookyMyTrip",
            description: "Test Transaction",
            // image: { logo },
            order_id: data.id,
            handler: async function (response) {
                const data = {
                    orderCreationId: data.id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                // const result = await axios.post("http://localhost:5000/payment/success", data);

                // alert(result.data.msg);
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    const handleBooking =async()=>{
        try{

            await axios.post(`${confirmBooking}/${hotel._id}`,{data}).then((response)=>{
                // initPayment(hotel,response)
                displayRazorpay(response.data)
    
            })
        }catch(err){
            console.log(err)
        }
    }



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
   

    return (
        <Box sx={{ padding: "1.5rem", boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)' }}>
            <Typography sx={{ marginTop: '2rem' }} variant='h8'>Please fill to contine with booking</Typography>
            <Grid container spacing={2} marginLeft={0.5} marginTop={0.75}>
                <Box sx={{ display: add ? 'none' : 'flex', alignItems: 'center', marginTop: 1, marginBottom: 1 }} >
                    <RadioGroup
                        aria-label="guest role"
                        name="controlled-radio-buttons-group"
                        value={selectedValue}
                        onChange={(event) => setSelectedValue(event.target.value)}
                        sx={{ display: 'flex' }}
                        row={true}
                        fontSize={10}
                    >
                        <FormControlLabel value="myself" control={<Radio />} label="Myself" />
                        <FormControlLabel value="someone" control={<Radio />} label="someone else" />
                    </RadioGroup>
                </Box>
                {add ? (<>
                    <Box>
                        <Typography variant='h6'>Add Guest</Typography>
                        <Typography fontSize={13}
                            lineHeight={1.2}
                            color="textSecondary" variant="body1"
                            sx={{ marginTop: '0.5rem', marginBottom: '1rem' }}
                            disabled >
                            Name should be as per official govt. ID & travelers below 18 years of age
                            cannot travel alone</Typography>
                    </Box>
                </>) : ""


                }
                <Box sx={{ gap: '20px', display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <FormControl>
                        <InputLabel id="prefix-label">Title</InputLabel>
                        <Select
                            labelId="Title-label"
                            id="Titles"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            label="Title"
                            sx={{ height: ' 40px', width: '80px' }}
                        >
                            <MenuItem value="Mr">Mr</MenuItem>
                            <MenuItem value="Mrs">Mrs</MenuItem>
                            <MenuItem value="Ms">Ms</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid item xs={4} lg={5} sm={4}>
                        <TextField formLabel=""
                            label="First Name"
                            name="firstName"
                            type="text"
                            helperText={errors.firstNameErr ? errors.firstNameErr :''}
                            error={errors.firstNameErr ? true:false}
                            defaultValue={selectedValue != 'myself' ? '' : user?.username}
                            onChange={(e) => handleChange(e)}
                            onFocus={() => setErrors({ ...errors, ["firstNameErr"]: "" })}
                        />
                    </Grid>
                    <Grid item xs={4} lg={5} sm={4}>
                        <TextField formLabel=""
                            label="Last Name"
                            name="lastName"
                            type="text"
                            helperText={errors.lastNameErr ? errors.lastNameErr :''}
                            error={errors.lastNameErr ? true:false}
                            defaultValue=''
                            onChange={(e) => handleChange(e)}
                            onFocus={() => setErrors({ ...errors, ["lastNameErr"]: "" })}
                        />
                    </Grid>
                </Box>
            </Grid>
            <Box sx={{ display: 'flex', gap: '3rem', alignItems: 'center', marginTop: '15px', marginBottom: '1rem' }}>
                <Grid item xs={4} lg={5} sm={5}>
                    <TextField formLabel="Email (confirmation voucher would be sent to this email)"
                        label="email"
                        name="email"
                        type="email"
                        helperText={errors.emailErr ? errors.emai :''}
                        error={errors.emailErr ? true:false}
                        defaultValue={user ? user.email : ''}
                        onChange={(e) => handleChange(e)}
                        onFocus={() => setErrors({ ...errors, ["emailErr"]: "" })}
                    />
                </Grid>
                <Grid item xs={4} lg={5} sm={5}>
                    <TextField formLabel=""
                        label="phone"
                        name="phone"
                        type="number"
                        helperText={errors.phoneErr ? errors.phoneErr :''}
                        error={errors.phone ? true:false}
                        defaultValue={user ? user.phone : ''}
                        onChange={(e) => handleChange(e)}
                        onFocus={() => setErrors({ ...errors, ["phoneErr"]: "" })}
                    />
                </Grid>
            </Box>
            <Box sx={{display:'flex',justifyContent:'space-between',marginTop:'2rem'}}>
                <Button onClick={handleOpen} variant='outlined' sx={{height:'3.125rem',width:'11rem'}}>+Add guest</Button>
                <Button variant="contained"sx={{height:'3.125rem',width:'12rem'}} onClick={handleBooking} >continue booking</Button>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style }}>

                </Box>
            </Modal>
        </Box>
    )
}

export default BookingForm