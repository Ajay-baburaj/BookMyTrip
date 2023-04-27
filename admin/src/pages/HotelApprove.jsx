import React from 'react'
import axios from "axios"
import { useEffect } from 'react'
import { hotelAcceptUrl, hotelApprovalUrl, hotelRejectUrl, getCompleteDetailsUrl } from '../utils/ApiRoutesAdmin'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Box, Button, Typography } from '@mui/material'
import {toast,Toaster} from 'react-hot-toast'
import ModalComponent from '../components/ModalComponent'

const HotelApprove = () => {
    const [data, setData] = useState([])
    const [approve, setApprove] = useState(false)
    const [cmpltData, setCmpltData] = useState([])
    const [open, setOpen] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['jwt', 'refreshToken'])
    const [id, setId] = useState("")

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    useEffect(() => {
        getApprovalData()
    }, [approve])

    const getApprovalData = async () => {
        const details = await axios.get(hotelApprovalUrl, {
            headers: {
                withCredentials: true,
                "Authorization": `Bearer ${cookies?.accessToken}`
            }
        })
        setData(details?.data)
    }

    useEffect(() => {
        appendImagesWithDetails(data)
    }, [data])

    useEffect(() => {

    }, [data])


    const appendImagesWithDetails = async (data) => {
        try {
            const promises = data.map(async (hotel) => {
                const hotelDetails = await axios.get(`${getCompleteDetailsUrl}/?id=${hotel._id}`, {
                    headers: {
                        withCredentials: true,
                        "Authorization": `Bearer ${cookies?.accessToken}`
                    }
                })
                return hotelDetails?.data?.hotelData
            })
            const hotelDetails = await Promise.all(promises)
            setCmpltData(hotelDetails);
        } catch (err) {
            console.log(err.message)
        }
    }


    const handleApprove = async (id) => {
        await axios.put(`${hotelAcceptUrl}/${id}`, {}, {
            headers: {
                withCredentials: true,
                "Authorization": `Bearer ${cookies?.accessToken}`
            }
        }).then((response) => {
            toast.success("Approval successfull")
            setApprove(!approve)
        }).catch((err) => {
            alert(err.message)
        })

    }

   
    const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure want to reject ?")
    if(confirmation){
        await axios.delete(`${hotelRejectUrl}/${id}`, {
            headers: {
                withCredentials: true,
                "Authorization": `Bearer ${cookies?.accessToken}`
            }
        }).then((response) => {
            toast.success("successfully deleted")
        }).catch((err) => {
            console.log(err.message)
            alert(err.message)
        })
    }
       
    }

    console.log(id)

    return (
        <>
            <Box>
                {
                    cmpltData.length != 0 ? cmpltData.map((req, index) => {
                        return (
                            <Box
                                width="60%"
                                key={""}
                                m={2}
                                display="flex"
                                flexDirection="row"
                                justifyContent="space-between"
                                p={4}
                                sx={{
                                    marginX: 'auto',
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: 6,
                                    boxShadow: '2px 2px 8px #c7c7c7, -2px -2px 8px #ffffff',
                                }}
                            >
                                <Box display="flex" flexDirection="row" alignItems="center">
                                    <img src={req?.hotelImage[0]} alt="hotelImg" height={"50px"} width={"50px"} />
                                    <Box marginLeft={4}>
                                        <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={() => {
                                            setId(req._id)
                                            setOpen(true)
                                        }}>{req.name}</Typography>
                                        <Typography variant="caption">
                                            {req.city}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Button size="medium" variant="contained" color="primary"
                                        sx={{ marginRight: "1rem", padding: "10px" }} onClick={() => handleApprove(req._id)}>Approve</Button>
                                    <Button size="medium" variant="contained" color="error" onClick={() => handleDelete(req._id)}>Reject</Button>
                                </Box>
                                <ModalComponent id={id} open={open} handleClose={handleClose} />
                            </Box>


                        )

                    }) : (<Typography variant="h5" sx={{ padding: "10%", paddingLeft: "30rem" }}>No request to approve</Typography>)

                }
                <Toaster position="top-center" reverseOrder={false}
/>
            </Box>
        </>
    )
}

export default HotelApprove



