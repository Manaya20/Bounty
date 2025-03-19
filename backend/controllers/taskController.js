const supabase = require('../config/SupabaseClient');

const getAllTasks = async (req, res) => {
  try {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  const { title, description, skills_required, time_limit, creator_id, assigned_to } = req.body;

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
};

const updateTask = async (req, res) => {
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
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};