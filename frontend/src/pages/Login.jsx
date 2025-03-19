// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Call Supabase Auth API here (to be implemented later)
    console.log('Logging in with:', { email, password });
    navigate('/dashboard'); // Redirect to dashboard after login
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: { xs: 4, md: 8 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Welcome to Bounty
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
          Please log in to continue.
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3, width: '100%' }}>
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
            Log In
          </Button>
        </Box>
        <p>
        Don't have an account? <Button color="primary" onClick={() => navigate('/register')}>Sign Up</Button>
        </p>
      </Box>
    </Container>
  );
};

export default Login;