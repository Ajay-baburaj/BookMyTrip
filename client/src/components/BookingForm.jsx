import React, { useState, useEffect } from 'react'
import {
    TextField, Typography, Radio, RadioGroup, FormControlLabel, Box, MenuItem,
    Select, FormControl, InputLabel, Grid, Button, Modal
} from '@mui/material'
import axios from 'axios'
import { useSelector } from 'react-redux'
import{Toaster,toast} from 'react-hot-toast'
import { confirmBooking, verifyUrl, updateBookedByUrl, addGuestUrl } from '../utils/APIRoutes'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';


function BookingForm({callback}) {
    const user = useSelector(state => state?.user?.user)
    const hotel = useSelector(state => state?.booking?.details)
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);
    const [open, setOpen] = React.useState(false);
    const [add, setAdd] = useState(false)

    const [selectedValue, setSelectedValue] = useState('myself')
    const [guest, setGuest] = useState([])
    const [check, setCheck] = useState(false);
    const [bookedBy, setBookedBy] = useState({})
    const [addBookedBy, setAddBookedBy] = useState(false);
    const [title, setTitle] = useState('Mr')
    const [data, setData] = useState({ firstName: '', lastName: '', email: '', phone: '' })
    const [errors, setErrors] = useState({ emailErr: '', phoneErr: '', firstNameErr: '', lastNameErr: '' })
    const [guestName,setGuestName] = useState({GfirstName:'',GlastName:''})

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (selectedValue == 'myself') {
            setData({ firstName: user?.username, lastName: '', email: user?.email, phone: user?.phone })
        } else {
            setData({ firstName: '', lastName: '', email: '', phone: '' })
        }
        console.log('selectedValue changed: ', selectedValue)
    }, [selectedValue])

    const handleGuest = async() => {
        const guestFullName = title + " " + guestName?.GfirstName + ' ' + guestName?.GlastName
        const {data} = await axios.post(`${addGuestUrl}/${hotel._id}`,{guestName},{
            headers: {
              withCredentials: true,
              'Authorization': `Bearer ${cookies?.accessToken}`
            }
          })
        if(data.status == false){
            toast.error(data.errMessage)
        }else{
            callback()
            toast.success('guest added')
        }
         }

       const guestChange = (e)=>{
        setGuestName({...guestName,[e.target.name]:e.target.value})
       } 
    
    useEffect(() => {
        console.log(guest)
    }, [guest])

    useEffect(() => {
        console.log(data)
    }, [data])

    const handleOpen = () => {
        setOpen(true)
        setAdd(true)
    }
    const handleClose = () => {
        setOpen(false)
        setAdd(false)
    }
    const handleError = () => {
        let errors = {}
        const { firstName, lastName, email, phone } = data;
        if (firstName == '') {
            setErrors({ ...errors, firstNameErr: "Enter First Name" })
            return false
        } else if (firstName.length < 3) {
            setErrors({ ...errors, firstNameErr: "FIrst Name should be more than 3 characters" })
            return false
        } else if (lastName == '') {
            setErrors({ ...errors, lastNameErr: 'Enter Last Name' })
            return false
        } else if (lastName.length < 3) {
            setErrors({ ...errors, lastNameErr: "Last Name should be more than 3 characters" })
            return false
        } else if (email == '') {
            setErrors({ ...errors, emailErr: 'email required' })
            return false
        } else if (phone == '') {
            setErrors({ ...errors, phoneErr: 'phone number required' })
            return false
        } else if (phone.length > 10 || phone.length > 10) {
            setErrors({ ...errors, phoneErr: 'Invalid Phone number' })
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


    async function displayRazorpay(data) {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }


        const options = {
            key: "rzp_test_wBILsF6sI8t8aF", 
            amount: hotel?.total,
            currency: "INR",
            name: "bookyMyTrip",
            description: "Test Transaction",
            order_id: data.id,
            handler: async function (response) {
                console.log(response)
                const datas = {
                    orderCreationId: data.id,
                    bookingId: hotel?._id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                };

                try {
                    await axios.post(verifyUrl, datas,{
                        headers: {
                          withCredentials: true,
                          'Authorization': `Bearer ${cookies?.accessToken}`
                        }
                      }).then((res)=>{
                        toast.success('Booking successfull')
                        setTimeout(() => {
                            navigate(`/booking/details/${hotel._id}`)
                        }, 3000)

                    })
                } catch (err) {
                    console.log(err.message)
                }


            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }


    const handleForm = async () => {
        if (handleError()) {
          const editedData = await axios.put(`${updateBookedByUrl}/${hotel._id}`, { data },{
            headers: {
              withCredentials: true,
              'Authorization': `Bearer ${cookies?.accessToken}`
            }
          });
          return true; 
        } else {
          return false; 
        }
      }
      
      const handleBooking = async () => {
        const isFormValid = await handleForm() 
        if (isFormValid) { 
          try {
            await axios.post(`${confirmBooking}/${hotel._id}`, { data },{
                headers: {
                  withCredentials: true,
                  'Authorization': `Bearer ${cookies?.accessToken}`
                }
              }).then((response) => {
                if(response.data.paymentStatus){
                    toast.success('Booking successfull')
                        setTimeout(() => {
                            navigate(`/booking/details/${hotel._id}`)
                        }, 3000)
                }else{
                    displayRazorpay(response.data);
                }
            });
          } catch (err) {
            console.log(err);
          }
        } else {
          console.log('something went wrong')
        }
      }
      


    useEffect(() => {
        console.log(errors)
    }, [errors])

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
        <Box sx={{ padding: "1.5rem", boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)', marginTop: { lg: '2rem' } }}>
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
                            helperText={errors.firstNameErr ? errors.firstNameErr : ''}
                            error={errors.firstNameErr ? true : false}
                            onChange={(e) => handleChange(e)}
                            onFocus={() => setErrors({ ...errors, ["firstNameErr"]: "" })}
                            value={data && data?.firstName}
                        />
                    </Grid>
                    <Grid item xs={4} lg={5} sm={4}>
                        <TextField formLabel=""
                            label="Last Name"
                            name="lastName"
                            type="text"
                            helperText={errors.lastNameErr ? errors.lastNameErr : ''}
                            error={errors.lastNameErr ? true : false}
                            onChange={(e) => handleChange(e)}
                            onFocus={() => setErrors({ ...errors, ["lastNameErr"]: "" })}
                            value={data && data?.lastName}
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
                        helperText={errors.emailErr ? errors.emailErr : ''}
                        error={errors.emailErr ? true : false}
                        onChange={(e) => handleChange(e)}
                        onFocus={() => setErrors({ ...errors, ["emailErr"]: "" })}
                        value={data && data?.email}
                    />
                </Grid>
                <Grid item xs={4} lg={5} sm={5}>
                    <TextField formLabel=""
                        label="phone"
                        name="phone"
                        type="number"
                        helperText={errors.phoneErr ? errors.phoneErr : ''}
                        error={errors.phoneErr ? true : false}
                        onChange={(e) => handleChange(e)}
                        onFocus={() => setErrors({ ...errors, ["phoneErr"]: "" })}
                        value={data && data?.phone}
                    />
                </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <Button onClick={handleOpen} variant='outlined' sx={{ height: '3.125rem', width: '11rem' }}>+Add guest</Button>
                <Button variant="contained" sx={{ height: '3.125rem', width: '12rem' }} onClick={handleBooking} >continue booking</Button>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style }}>
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
                            name="GfirstName"
                            type="text"
                            helperText={errors.firstNameErr ? errors.firstNameErr : ''}
                            error={errors.firstNameErr ? true : false}
                            onChange={(e) => guestChange(e)}
                            // onFocus={() => setErrors({ ...errors, ["firstNameErr"]: "" })}
                            // value={data && data?.firstName}
                        />
                    </Grid>
                    <Grid item xs={4} lg={5} sm={4}>
                        <TextField formLabel=""
                            label="Last Name"
                            name="GlastName"
                            type="text"
                            helperText={errors.lastNameErr ? errors.lastNameErr : ''}
                            error={errors.lastNameErr ? true : false}
                            onChange={(e) => guestChange(e)}
                            // onFocus={() => setErrors({ ...errors, ["lastNameErr"]: "" })}
                            // value={data && data?.lastName}
                        />
                    </Grid>
                </Box>
                <Button variant='outlined' onClick={handleGuest}>Add</Button>
                </Box>
            </Modal>
            <Toaster position="top-center" reverseOrder={false}
            />
        </Box>
    )
}

export default BookingForm