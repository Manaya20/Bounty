import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase.from('tasks').select('*');
      if (error) throw error;
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const createTask = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const creator_id = user?.id;
  
    if (!creator_id) {
      console.error('User not logged in');
      return;
    }
  
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ 
          title, 
          description, 
          skills_required: [], 
          time_limit: 24, 
          creator_id, 
          status: 'pending' 
        }]);
  
      if (error) throw error;
      console.log('Task created:', data);
      setTasks([...tasks, ...data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={createTask}>Create Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;