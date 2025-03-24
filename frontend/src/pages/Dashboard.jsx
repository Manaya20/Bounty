// src/pages/Dashboard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const Dashboard = () => {
  const navigate = useNavigate();

  // Simulate user role (replace this with actual role from Supabase Auth)
  const userRole = 'tasker'; // Example: 'tasker' or 'client'

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', mt: { xs: 8, md: 12 }, mb: { xs: 6, md: 10 } }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 'bold' }}>
        Welcome to Your Dashboard
      </Typography>

      {/* Role-Specific Content */}
      {userRole === 'client' && (
        <Box sx={{ mt: { xs: 4, md: 6 } }}>
          <Button
            component={Link}
            to="/create-task"
            variant="contained"
            size="large"
            sx={{ mr: 2, px: 4, py: 1.5, fontSize: { xs: '0.875rem', md: '1rem' } }}
          >
            Create a Task
          </Button>
          <Button
            onClick={() => navigate('/browse-tasks')}
            variant="outlined"
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: { xs: '0.875rem', md: '1rem' } }}
          >
            Browse Tasks
          </Button>
        </Box>
      )}

      {userRole === 'tasker' && (
        <Box sx={{ mt: { xs: 4, md: 6 } }}>
          <Button
            onClick={() => navigate('/browse-tasks')}
            variant="contained"
            size="large"
            sx={{ mr: 2, px: 4, py: 1.5, fontSize: { xs: '0.875rem', md: '1rem' } }}
          >
            Find Tasks
          </Button>
          <Button
            component={Link}
            to="/profile"
            variant="outlined"
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: { xs: '0.875rem', md: '1rem' } }}
          >
            Update Profile
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;