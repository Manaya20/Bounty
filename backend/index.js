const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// Fetch all tasks
app.get('/tasks', async (req, res) => {
  try {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: error.message });
  }
});

// Fetch a single task by ID
app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase.from('tasks').select('*').eq('id', id).single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a new task
app.post('/tasks', async (req, res) => {
  const { title, description, skills_required, time_limit, creator_id, assigned_to } = req.body;

  // Validate required fields
  if (!title || !creator_id) {
    return res.status(400).json({ error: 'Title and creator_id are required' });
  }

  // Check if creator_id exists in auth.users
  const { data: creator, error: creatorError } = await supabase
    .from('users')
    .select('id')
    .eq('id', creator_id)
    .single();

  if (creatorError || !creator) {
    return res.status(400).json({ error: 'Invalid creator_id' });
  }

  // Check if assigned_to exists in auth.users (if provided)
  if (assigned_to) {
    const { data: assignee, error: assigneeError } = await supabase
      .from('users')
      .select('id')
      .eq('id', assigned_to)
      .single();

    if (assigneeError || !assignee) {
      return res.status(400).json({ error: 'Invalid assigned_to' });
    }
  }

  // Insert the task
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

// Update a task
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, skills_required, time_limit, status, assigned_to } = req.body;

  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({ title, description, skills_required, time_limit, status, assigned_to })
      .eq('id', id);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});