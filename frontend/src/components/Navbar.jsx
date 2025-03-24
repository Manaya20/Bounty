// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Bounty
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/login" color="inherit">
            Log In
          </Button>
          <Button component={Link} to="/register" color="inherit" variant="outlined">
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;