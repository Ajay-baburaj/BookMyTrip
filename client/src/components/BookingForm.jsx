import {
    TextField, Typography, Box, Modal, Grid
} from '@mui/material'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import GuestDetails from './GuestDetails'

function BookingForm() {
    const [open, setOpen] = React.useState(false);
    const [add, setAdd] = useState(false)
    const handleOpen = () => {
        setOpen(true)
        setAdd(true)
    }
    const handleClose = () => {
        setOpen(false)
        setAdd(false)
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
        <Box sx={{ padding:"1.5rem" ,boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)' }}>
            <Typography sx={{ marginTop: '2rem'}} variant='h8'>Please fill to contine with booking</Typography>
            <GuestDetails />
            <Box sx={{ display: 'flex', gap: '3rem', alignItems: 'center', marginTop: '15px', marginBottom: '1rem' }}>
                <Grid item xs={4} lg={5} sm={5}>
                    <TextField formLabel="Email (confirmation voucher would be sent to this email)"
                        label="email"
                        name="email"
                        type="email"
                        helperText=''
                        error=''
                        defaultValue=''
                    // onClick={(e) => handleChange(e)}
                    // onFocus={() => setErrors({ ...errors, ["roomTypeError"]: "" })}
                    />
                </Grid>
                <Grid item xs={4} lg={5} sm={5}>
                    <TextField formLabel=""
                        label="phone"
                        name="phone"
                        type="number"
                        helperText=''
                        error=''
                        defaultValue=''
                    // onClick={(e) => handleChange(e)}
                    // onFocus={() => setErrors({ ...errors, ["roomTypeError"]: "" })}
                    />
                </Grid>

            </Box>
            <Button onClick={handleOpen}>+Add guest</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style }}>
                    <GuestDetails add={add} />
                </Box>
            </Modal>
        </Box>
    )
}

export default BookingForm