import { Box, Paper } from '@mui/material';
import React from 'react';
import UserGraph from '../components/UserGraph';
import PostGraph from '../components/PostGraph';

function Charts() {
  return (
    <Box display="flex" p={5} gap={2} justifyContent="space-between">
      <Paper sx={{ width: '500px' }}>
        <UserGraph />
      </Paper>
      {/* <Paper sx={{ width: '500px' }}>
        <PostGraph />
      </Paper> */}
    </Box>
  );
}

export default Charts;