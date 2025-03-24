// src/pages/CreateTask.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, InputLabel, OutlinedInput, FormControl } from '@mui/material';

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillsRequired: '',
    timeLimit: '',
    budget: '',
    location: '',
    attachment: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call Supabase API to create a task (to be implemented later)
    console.log('Creating task:', formData);
    navigate('/dashboard'); // Redirect to dashboard after task creation
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: { xs: 4, md: 8 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Create a New Task
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          {/* Title */}
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* Description */}
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          {/* Skills Required */}
          <TextField
            label="Skills Required (comma-separated)"
            fullWidth
            margin="normal"
            name="skillsRequired"
            value={formData.skillsRequired}
            onChange={handleChange}
            required
          />

          {/* Time Limit */}
          <TextField
            label="Time Limit (e.g., 2023-12-31)"
            type="datetime-local"
            fullWidth
            margin="normal"
            name="timeLimit"
            value={formData.timeLimit}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />

          {/* Budget */}
          <TextField
            label="Budget ($)"
            fullWidth
            margin="normal"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          />

          {/* Location */}
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />

          {/* Attachment */}
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="attachment">Attachment</InputLabel>
            <OutlinedInput
              id="attachment"
              type="file"
              onChange={handleFileChange}
            />
          </FormControl>

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
            Create Task
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateTask;