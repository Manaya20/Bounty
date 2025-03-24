// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('client'); // Default role is "tasker"
  const [passwordError, setPasswordError] = useState(''); // For password validation
  const navigate = useNavigate();

  const handleRoleClick = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError(''); // Clear error message

    // Call Supabase Auth API here (to be implemented later)
    console.log('Registering with:', { email, password, role });
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

        {/* Role Selection */}
        <Box sx={{ width: '100%', mt: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Select Your Role
          </Typography>
          <Grid container spacing={2}> {/* Ensure spacing between boxes */}
            {/* Tasker Option */}
            <Grid item xs={12} sm={6}>
              <Box
                onClick={() => handleRoleClick('tasker')}
                sx={{
                  border: role === 'tasker' ? '2px solid #1976d2' : '1px solid #ccc',
                  borderRadius: 1,
                  p: 1,
                  cursor: 'pointer',
                  textAlign: 'center',
                  '&:hover': { borderColor: '#1976d2' },
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Tasker
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Complete tasks and earn rewards.
                </Typography>
              </Box>
            </Grid>

            {/* Client Option */}
            <Grid item xs={12} sm={6}>
              <Box
                onClick={() => handleRoleClick('client')}
                sx={{
                  border: role === 'client' ? '2px solid #1976d2' : '1px solid #ccc',
                  borderRadius: 1,
                  p: 1,
                  cursor: 'pointer',
                  textAlign: 'center',
                  '&:hover': { borderColor: '#1976d2' },
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Client
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Post tasks and hire taskers.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Registration Form */}
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 1, width: '100%' }}>
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
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            error={!!passwordError}
            helperText={passwordError}
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
      </Box>
    </Container>
  );
};

export default Register;