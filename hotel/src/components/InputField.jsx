import React from 'react'
import { Box, TextField, FormLabel} from '@mui/material';

function InputField(props) {
     const {formLabel,label,name,type,helperText,error,callback,onFocusCallback,rows,defaultValue} = props
     console.log(defaultValue);
    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", marginTop: "18px", marginBottom: "15px" }}>
                <FormLabel>{formLabel}</FormLabel>
                <TextField id="outlined-basic"
                    label={label}
                    type ={type}
                    variant="outlined"
                    name={name}
                    defaultValue ={defaultValue}
                    value={defaultValue}
                    helperText={helperText}
                    error={error}
                    onChange={callback} 
                    onFocus={onFocusCallback}
                    rows={rows}
                    />
                     
            </Box>
        </>
    )
}

export default InputField