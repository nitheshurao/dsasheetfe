import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          Dashboard
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>Profile</Button>
          <Button color="inherit" onClick={() => navigate('/topics')}>Topics</Button>
          <Button color="inherit" onClick={() => navigate('/progress')}>Progress</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
