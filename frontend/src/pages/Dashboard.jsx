// src/pages/Dashboard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const Dashboard = () => {
  const navigate = useNavigate();

  // Simulate user role (client or tasker)
  const userRole = 'tasker'; // Replace this with actual user role from Supabase Auth

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', mt: { xs: 8, md: 12 }, mb: { xs: 6, md: 10 } }}>
      {/* Welcome Message */}
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 'bold' }}>
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, color: 'text.secondary' }}>
        Here's what you can do today.
      </Typography>

      {/* Actions Based on Role */}
      {userRole === 'client' && (
        <Box sx={{ mt: { xs: 4, md: 6 } }}>
          <Button
            component={Link}
            to="/create-task"
            variant="contained"
            size="large"
            sx={{
              mr: 2,
              px: 4,
              py: 1.5,
              fontSize: { xs: '0.875rem', md: '1rem' },
            }}
          >
            Create a Task
          </Button>
          <Button
            onClick={() => navigate('/browse-tasks')}
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: { xs: '0.875rem', md: '1rem' },
            }}
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
            sx={{
              mr: 2,
              px: 4,
              py: 1.5,
              fontSize: { xs: '0.875rem', md: '1rem' },
            }}
          >
            Find Tasks
          </Button>
          <Button
            component={Link}
            to="/profile"
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: { xs: '0.875rem', md: '1rem' },
            }}
          >
            Update Profile
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;