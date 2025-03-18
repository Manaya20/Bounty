const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/tasks', async (req, res) => {
  try {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/tasks', async (req, res) => {
  const { title, description, skills_required, time_limit, creator_id } = req.body;
  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, description, skills_required, time_limit, creator_id, status: 'pending' }]);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});