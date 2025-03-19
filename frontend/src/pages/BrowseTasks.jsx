// src/pages/BrowseTasks.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Simulate fetching tasks from Supabase (to be implemented later)
  useEffect(() => {
    const fetchTasks = async () => {
      // Replace this with actual Supabase API call
      const mockTasks = [
        { id: 1, title: 'Build a Website', description: 'Need a React-based website.', skills_required: ['React', 'Node.js'], time_limit: '2023-12-31' },
        { id: 2, title: 'Design a Logo', description: 'Minimalist logo design needed.', skills_required: ['Graphic Design', 'Illustrator'], time_limit: '2023-11-15' },
      ];
      setTasks(mockTasks);
    };
    fetchTasks();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 8 } }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 'bold' }}>
        Available Tasks
      </Typography>

      {/* Task List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Card key={task.id} sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {task.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {task.description}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Skills Required:</strong> {task.skills_required.join(', ')}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Deadline:</strong> {task.time_limit}
                </Typography>
                <Button
                  component={Link}
                  to={`/task/${task.id}`} // Navigate to task details page (to be implemented later)
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No tasks available at the moment.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default BrowseTasks;