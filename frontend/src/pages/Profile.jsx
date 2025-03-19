// src/pages/Profile.jsx
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Profile = () => {
  const [skills, setSkills] = useState('');
  const [preferences, setPreferences] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call Supabase API to update profile (to be implemented later)
    console.log('Updating profile:', { skills, preferences });
    alert('Profile updated successfully!');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: { xs: 4, md: 8 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Update Your Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <TextField
            label="Skills (comma-separated)"
            fullWidth
            margin="normal"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
          <TextField
            label="Preferences (e.g., remote work, part-time)"
            fullWidth
            margin="normal"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            required
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
            Save Changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;