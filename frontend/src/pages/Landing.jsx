// src/pages/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const Landing = () => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', mt: { xs: 8, md: 12 }, mb: { xs: 6, md: 10 } }}>
      {/* Hero Section */}
      <Box>
        <Typography variant="h2" gutterBottom sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 'bold' }}>
          Welcome to Bounty
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, color: 'text.secondary' }}>
          Connect, collaborate, and get things done with ease.
        </Typography>
      </Box>

      {/* Call-to-Action Buttons */}
      <Box sx={{ mt: { xs: 4, md: 6 } }}>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          size="large"
          sx={{
            mr: 2,
            px: 4,
            py: 1.5,
            fontSize: { xs: '0.875rem', md: '1rem' },
          }}
        >
          Sign Up
        </Button>
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: { xs: '0.875rem', md: '1rem' },
          }}
        >
          Log In
        </Button>
      </Box>
    </Container>
  );
};

export default Landing;