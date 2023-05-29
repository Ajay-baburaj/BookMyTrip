import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {useCookies} from 'react-cookie'



export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate= useNavigate()
  const dispatch = useDispatch()
  const [cookies,setCookie,removeCookie] = useCookies([])

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout =()=>{
    dispatch({
      type:"ADMIN_LOGOUT",
      payload:{
        email:null,
      }
    })
    setCookie('jwt','',{expires:new Date(0)})
    setCookie('refreshToken', '', { expires: new Date(0) })
    navigate("/admin/login")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{marginTop:"0px"}}>
        <Toolbar sx={{backgroundColor:"black"}}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 ,marginLeft:"2rem"}}>
            BookmyTrip                                                                                                                                                                                                                         
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}