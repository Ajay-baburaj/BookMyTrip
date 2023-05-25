import React,{useState} from 'react'
import InputField from '../components/InputField'
import { Box, Grid, Typography, Button} from '@mui/material';
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {passwordResetUrl} from '../utils/ApiRoutesAdmin'
import SnackBar from '../components/SnackBar'


function ResetPassword() {
    const navigate = useNavigate()
    const [success,setSuccess] = useState(false)
    const {id,token} = useParams();
    const [data,setData] = useState({
        password:"",
        confirmPassword:""
    })
    const [error,setError] = useState({
        passwordErr:"",
        confirmPasswordErr:""
    })
    const handleChange = (e)=>{
        setData({
            ...data,[e.target.name]:e.target.value
        })
    }
    
    const validateForm = ()=>{
        const{password,confirmPassword} = data;
        if(password===""){
            setError({
                ["passwordErr"]:"enter password"
            })
            return false
        }
        if(password.length <= 3 ){
            setError({
                ["passwordErr"]:"password should be greater than 3 characters"
            })
            return false
        }
        
        if(password !== confirmPassword){
            setError({
                ["passwordErr"]:"password and confirm password must be same",
                ["confirmPasswordErr"]:"password and confirm password must be same"
                
            })
            return false;
        }
        return true
        
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const {password,confirmPassword} = data;
        if(validateForm()){
          axios.post(passwordResetUrl,{password,id,token}).then((response)=>{
            if(response.data.status){
                setSuccess(true);
                setTimeout(()=>{
                    navigate("/admin/login")
                },2000)
                ;
            }else{
                alert(response.data.msg)
            }
           
          })
        }
        
    }

    
  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", padding: "8%" }}>
      <Box>
        <Grid>
          <Grid sm={10} md={6} sx={{ boxShadow: 3, maxHeight: "500px", maxWidth: "500px", padding: "4rem" }}>
            <Typography sx={{ textAlign: "center", fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>Enter new password</Typography>
            <form onSubmit={handleSubmit}>
              <InputField formLabel=""
                label="password"
                name="password"
                type="password"
                helperText={error.passwordErr ? error.passwordErr : ""}
                error={error.passwordErr ? true : false}
                callback={(e)=>handleChange(e)} 
                onFocusCallback={() => setError({ ...error, ["passwordErr"]: "" })}/>
              <InputField FormLabel=""
                label="confirm password"
                name="confirmPassword"
                type="password"
                helperText={error.confirmPasswordErr ? error.confirmPasswordErr : ""}
                error={error.confirmPasswordErr ? true : false}
                callback={(e) => handleChange(e)} 
                onFocusCallback={() => setError({ ...error, ["confirmPasswordErr"]: "" })}
                />

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button type='submit' variant="contained">submit</Button>

              </Box>
            </form>

          </Grid>
        </Grid>
      </Box>
      {success && <SnackBar text={"Password Reset Successfull"} color={"success"}/>}
    </Box>
  )
}

export default ResetPassword;