const supabase = require('../config/SupabaseClient');

const getAllTasks = async () => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) throw error;
  return data;
};

const createTask = async (task) => {
  const { data, error } = await supabase.from('tasks').insert([task]);
  if (error) throw error;
  return data;
};

const updateTask = async (id, updates) => {
  const { data, error } = await supabase.from('tasks').update(updates).eq('id', id);
  if (error) throw error;
  return data;
};

const deleteTask = async (id) => {
  const { data, error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) throw error;
  return data;
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};