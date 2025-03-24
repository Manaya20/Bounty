// src/pages/TaskDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Card, CardContent } from '@mui/material';
import Chat from '../components/Chat';


const TaskDetails = () => {
  const { taskId } = useParams(); // Get task ID from URL
  const [task, setTask] = useState(null);

  // Simulate fetching task details from Supabase (to be implemented later)
  useEffect(() => {
    const fetchTask = async () => {
      // Replace this with actual Supabase API call
      const mockTasks = [
        { id: 1, title: 'Build a Website', description: 'Need a React-based website.', skills_required: ['React', 'Node.js'], time_limit: '2023-12-31' },
        { id: 2, title: 'Design a Logo', description: 'Minimalist logo design needed.', skills_required: ['Graphic Design', 'Illustrator'], time_limit: '2023-11-15' },
      ];
      const selectedTask = mockTasks.find((t) => t.id === parseInt(taskId));
      setTask(selectedTask);
    };
    fetchTask();
  }, [taskId]);

  if (!task) {
    return <Typography>Loading task details...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 8 } }}>
      <Card sx={{ boxShadow: 3, p: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
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
          
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" sx={{ mr: 2 }}>
              Apply for Task
            </Button>
            <Button component={Link} to="/browse-tasks" variant="outlined">
              Back to Tasks
            </Button>
            
          </Box>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Chat with Client
          </Typography>
          {/* <Chat
            messages={[
              { sender: 'Client', text: 'Hi, are you interested in this task?' },
              { sender: 'Tasker', text: 'Yes, I am interested.' },
            ]}
            onSendMessage={(message) => console.log('New message:', message)} // Replace with Supabase Realtime logic
          /> */}
          
        </CardContent>
      </Card>
    </Container>
  );
};

export default TaskDetails;