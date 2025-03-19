const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  req.supabase = supabase.auth.setAuth(token); 
  next();
};

// Fetch all tasks
app.get('/tasks', authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a new task
app.post('/tasks', authenticate, async (req, res) => {
  const { title, description, skills_required, time_limit, creator_id, assigned_to } = req.body;

  // Validate required fields
  if (!title || !creator_id) {
    return res.status(400).json({ error: 'Title and creator_id are required' });
  }

  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, description, skills_required, time_limit, creator_id, assigned_to, status: 'pending' }]);

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});