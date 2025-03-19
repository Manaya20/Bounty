// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Call Supabase Auth API here (to be implemented later)
    console.log('Registering with:', { email, password });
    navigate('/login'); // Redirect to login page after registration
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: { xs: 4, md: 8 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Join Bounty Today
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
          Create your account to get started.
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 3, width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              '& .MuiInputBase-root': { fontSize: '1rem' },
              '& .MuiInputLabel-root': { fontSize: '1rem' },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              '& .MuiInputBase-root': { fontSize: '1rem' },
              '& .MuiInputLabel-root': { fontSize: '1rem' },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: { xs: '0.875rem', md: '1rem' },
            }}
          >
            Sign Up
          </Button>
        </Box>
        <p>
            Already have an account? <Button color="primary" onClick={() => navigate('/login')}>Log in</Button>
        </p>
      </Box>
    </Container>
  );
};

export default Register;