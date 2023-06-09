import React, { useState, useEffect } from 'react';
import { Box, Typography,Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchResults({ userData }) {
  const user = useSelector((state) => state.user);
  const [isUser, setIsUser] = useState(false);
  const [followed, setFollowed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.username === user.name) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
    if (userData.isfollowing) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, []);

  const viewprofile = (name) => {
    if (name === user.name) {
      navigate('/profile');
    } else {
      navigate(`/${name}`);
    }
  };

  const follow = (name) => {
    const follower = {
      id: user.id,
      name: user.name,
      email: user.email,
      profle: user.profile || null,
    };
    axios.put(`/follow/${name}`, follower).then((res) => {
      console.log(res);
      setFollowed(!followed);
    }).catch((err) => {
      console.log(err);
      setFollowed(false);
    });
  };
  return (
    <Box
      width="60%"
      key={userData.username}
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
      <Box display="flex" flexDirection="row" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => viewprofile(userData.username)}>
      
        <Box marginLeft={4}>
          <Typography variant="h6">{userData.username}</Typography>
          <Typography variant="caption">
            {userData.email}
          </Typography>
        </Box>
      </Box>
      <Box>
        {isUser
          ? <Button size="medium" variant="contained" color="primary" Text="Go to profile" callback={() => navigate('/profile')} />
          : followed
            ? <Button size="medium" variant="contained" color="primary" Text="UnFollow" callback={() => follow(userData.username)} />
            : <Button size="medium" variant="contained" color="secondar.main" Text="Follow" callback={() => follow(userData.username)} />}
      </Box>
    </Box>
  );
}

export default SearchResults;