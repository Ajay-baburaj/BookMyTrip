import React, { useState } from 'react'
import {
    TextField, Typography, Radio, RadioGroup, FormControlLabel, Box, MenuItem,
    Select, FormControl, InputLabel, Grid
} from '@mui/material'
import { Button } from 'react-bootstrap'

function GuestDetails({ add }) {
    const [selectedValue, setSelectedValue] = useState('')
    const [title, setTitle] = useState('mr')
    return (
        
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
            <Box>
                <Typography variant='h6'>Add Guest</Typography>
                <Typography  fontSize={13} 
                lineHeight={1.2} 
                color="textSecondary" variant="body1" 
                sx={{marginTop:'0.5rem',marginBottom:'1rem'}}
                disabled >
                Name should be as per official govt. ID & travelers below 18 years of age 
                cannot travel alone</Typography>
            </Box>
            <Box sx={{ gap: '20px', display: 'flex', alignItems: 'center',marginBottom:'1rem'}}>
                <FormControl>
                    <InputLabel id="prefix-label">Title</InputLabel>
                    <Select
                        labelId="Title-label"
                        id="Titles"
                        value={title}
                        defaultValue=''
                        onChange={(event) => setTitle(event.target.value)}
                        label="Title"
                        sx={{ height: ' 40px', width: '80px' }}
                    >
                        <MenuItem value="mr">Mr</MenuItem>
                        <MenuItem value="mrs">Mrs</MenuItem>
                        <MenuItem value="ms">Ms</MenuItem>
                    </Select>
                </FormControl>
                <Grid item xs={4} lg={5} sm={4}>
                    <TextField formLabel=""
                        label="First Name"
                        name="firstName"
                        type="text"
                        helperText=''
                        error=''
                        defaultValue=''
                    // onClick={(e) => handleChange(e)}
                    // onFocus={() => setErrors({ ...errors, ["roomTypeError"]: "" })}
                    />
                </Grid>
                <Grid item xs={4} lg={5} sm={4}>
                    <TextField formLabel=""
                        label="Last Name"
                        name="lastName"
                        type="text"
                        helperText=''
                        error=''
                        defaultValue=''
                    // onClick={(e) => handleChange(e)}
                    // onFocus={() => setErrors({ ...errors, ["roomTypeError"]: "" })}
                    />
                </Grid>
            </Box>
            {
                add && <Button sx ={{marginBottom:'2rem'}}>save guest</Button>
            }
        </Grid>
       
    )
}

export default GuestDetails