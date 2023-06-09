import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useState,useEffect} from "react"

import React from 'react'

function SnackBar({text,color}) {


    const [state, setState] = useState({
        snackbarOpen: false
    })

    function showSnackbar() {
        setState({ snackbarOpen: true });
    }

    useEffect(()=>{
        showSnackbar()
    },[])

    

    return (
        <div>
            <Snackbar open={state.snackbarOpen} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={() => setState({ snackbarOpen: false })}>
                <Alert severity={color} elevation={6} variant="filled">
                    {text}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default SnackBar