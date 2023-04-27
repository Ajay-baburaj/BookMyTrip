import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import { getUserUrl, userBlockUrl } from '../utils/ApiRoutesAdmin';
import { Typography } from '@mui/material';
import { useCookies } from 'react-cookie';

export default function BasicTable() {
  const [user, setUsers] = useState([]);
  const [blocked,setBlocked] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['jwt', 'refreshToken'])
  
  useEffect(() => {
    axios.get(getUserUrl, {
      headers: {
        withCredentials: true,
        'Authorization': `Bearer ${cookies?.accessToken}`
      }
    }).then((res) => {
      setUsers(res.data);
    }).catch((err) => {
      alert(err.msg);
    });
  }, [blocked]);


  const blockUser = (email) => {
    axios.post(userBlockUrl, { email }, {
      headers: {
        withCredentials: true,
        "Authorization": `Bearer ${cookies?.accessToken}`
      }
    }).then(() => {
      setBlocked(!blocked)
    }).catch((err) => {
      console.log(err);
    });
  };
  return (
    <TableContainer component={Paper}>
      <Typography variant='h5' textAlign='center' sx={{ marginTop: "1rem", marginBottom: "2.5rem" }}>User Management</Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Blocked</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((row, i) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="left">{row._id}</TableCell>
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.status ? <Typography sx={{color:'green', fontWeight:'bold'}}>active</Typography>:<Typography sx={{color:'red', fontWeight:'bold'}}>blocked</Typography>}</TableCell>
              <TableCell align="left">
                <Switch defaultChecked={row.status} onChange={() => blockUser(row.email)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
