import React from 'react'
import { Box, Grid, TextField, FormLabel, Typography, Button} from '@mui/material';

function InputField(props) {
     const {formLabel,label,name,type,helperText,error,callback} = props
    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", marginTop: "18px", marginBottom: "15px" }}>
                <FormLabel>{formLabel}</FormLabel>
                <TextField id="outlined-basic"
                    label={label}
                    type ={type}
                    variant="outlined"
                    name={name}
                    helperText={helperText}
                    error={error}
                    onChange={callback} />
            </Box>
        </>
    )
}

export default InputField