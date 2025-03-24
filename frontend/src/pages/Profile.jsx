// src/pages/Profile.jsx
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, InputLabel, OutlinedInput, FormControl, FormHelperText } from '@mui/material';

const Profile = () => {
  const [formData, setFormData] = useState({
    skills: '',
    preferences: '',
    bio: '',
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call Supabase API to update profile (to be implemented later)
    console.log('Updating profile:', formData);
    alert('Profile updated successfully!');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: { xs: 4, md: 8 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Update Your Profile
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          {/* Profile Picture */}
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="profile-picture">Profile Picture</InputLabel>
            <OutlinedInput
              id="profile-picture"
              type="file"
              onChange={handleFileChange}
              inputProps={{ accept: 'image/*' }}
            />
          </FormControl>

          {/* Skills */}
          <TextField
            label="Skills (comma-separated)"
            fullWidth
            margin="normal"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
          />

          {/* Preferences */}
          <TextField
            label="Preferences (e.g., remote work, part-time)"
            fullWidth
            margin="normal"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
          />

          {/* Bio */}
          <TextField
            label="Bio"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />

          {/* Submit Button */}
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