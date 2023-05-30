import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, CircularProgress, IconButton, InputAdornment, SpeedDial, SpeedDialAction, SpeedDialIcon, Tab, TextField, Tooltip } from '@mui/material'
import { CameraAlt, Close, Delete, Done, Edit } from '@mui/icons-material';
import axios from 'axios'

function User() {
    const [value, setValue] = React.useState('1');






    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <div style={{ width: '27%', display: 'flex' }}>
                    <Tooltip arrow title='upload profile picture' placement='bottom-end'>
                        <>
                            <Avatar
                                alt="Remy Sharp"
                                src={''}
                                sx={{ width: 150, height: 150 }}
                            />
                            {<CircularProgress className='profile-avatar' sx={{
                                position: 'absolute',
                                width: '150px !important',
                                height: '150px !important',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.5) !important',
                            }} />}
                        </>
                    </Tooltip>
                    <Box sx={{ height: 200, transform: 'translateZ(0px)', flexGrow: 1 }}>
                        <SpeedDial
                            ariaLabel="SpeedDial basic example"
                            sx={{ position: 'absolute', bottom: 16, right: 16 }}
                            icon={<SpeedDialIcon />}
                        >
                            {<SpeedDialAction
                                icon={<IconButton color="primary" aria-label="upload picture" component="label">
                                    <CameraAlt />
                                    <input hidden accept="image/*" type="file" />
                                </IconButton>}
                                tooltipTitle='Add Photo'
                            />
                            }    
                            {<SpeedDialAction
                                icon={<Delete/>}
                                tooltipTitle='Delete'
                            />}
                        </SpeedDial>
                    </Box>
                </div>
                <div style={{ width: '73%', display: 'flex' }}>
                    <div style={{ width: '40%' }}>
                        <p style={{ fontWeight: 'bold', color: '#1d213f', marginTop: '5px' }}>NAME</p>
                        <p style={{ fontWeight: 'bold', color: '#1d213f', marginTop: '30px' }}>EMAIL</p>
                        <p style={{ fontWeight: 'bold', color: '#1d213f', marginTop: '27px' }}>PHONE</p>
                        <p style={{ fontWeight: 'bold', color: '#1d213f', marginTop: '22px' }}>PASSWORD</p>
                    </div>
                    <div style={{ width: '60%' }}>
                        <TextField style={{ width: '100%' }} label="" variant="standard" InputProps={{
                            readOnly: true,
                            value: "",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton><Edit /></IconButton>
                                </InputAdornment>
                            ),
                        }} />
                        <TextField sx={{ marginTop: '20px', width: '100%' }} label="" variant="standard" InputProps={{
                            readOnly: true,
                            value: "" ,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton><Edit /></IconButton>
                                </InputAdornment>
                            ),
                        }} />
                        <TextField sx={{ marginTop: '20px', width: '100%' }} label="" variant="standard" InputProps={{
                            readOnly: true,
                            value: '',
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton><Edit /></IconButton>
                                </InputAdornment>
                            ),
                        }} />
                    </div>
                </div>

            </Box>
        </>
    );
}

export default User