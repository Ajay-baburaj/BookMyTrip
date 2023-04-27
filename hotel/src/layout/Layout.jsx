import React from 'react'
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar';

const UserLayout = () => {

    return (
      <Box sx={{marginTop: "20px"}} width="100%" height="100%" >
        <Box width="100%" zIndex={1} 
        sx={{ position:"fixed"}}
        >
        <Sidebar/>
        </Box>
        <Box flexGrow={1} >
          <Outlet sx={{m:5}}/>
        </Box>
      </Box>
    );
  };
  
  export default UserLayout;
