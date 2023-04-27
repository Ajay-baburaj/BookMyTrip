import React,{useState} from 'react'
import InputField from '../../components/InputField';
import { Box, Grid, TextField, FormLabel, Typography, Button, Modal } from '@mui/material';
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { passwordReset } from '../../utils/APIRoutes';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function ResetPassword() {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
   
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
          axios.post(passwordReset+`/${id}/${token}`,{password,id,token}).then((response)=>{
            if(response.data.status){
                navigate("/login");
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
                callback={(e)=>handleChange(e)} />
              <InputField FormLabel=""
                label="confirm password"
                name="confirmPassword"
                type="password"
                helperText={error.confirmPasswordErr ? error.confirmPasswordErr : ""}
                error={error.confirmPasswordErr ? true : false}
                callback={(e) => handleChange(e)} />

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button type='submit' variant="contained">submit</Button>

              </Box>
            </form>

          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default ResetPassword