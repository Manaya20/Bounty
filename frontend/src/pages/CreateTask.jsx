// src/pages/CreateTask.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call Supabase API to create a task (to be implemented later)
    console.log('Creating task:', { title, description, skillsRequired, timeLimit });
    navigate('/dashboard'); // Redirect to dashboard after task creation
  };

return (
    <Container maxWidth="sm">
        <Box sx={{ mt: { xs: 4, md: 8 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
                Create a New Task
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <TextField
                    label="Skills Required (comma-separated)"
                    fullWidth
                    margin="normal"
                    value={skillsRequired}
                    onChange={(e) => setSkillsRequired(e.target.value)}
                    required
                />
                <TextField
                    label="Time Limit"
                    type="datetime-local"
                    fullWidth
                    margin="normal"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(e.target.value)}
                    InputLabelProps={{ shrink: true }}
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
                    Create Task
                </Button>
            </Box>
        </Box>
    </Container>
);
};

export default CreateTask;