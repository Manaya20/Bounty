// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import BrowseTasks from './pages/BrowseTasks';
import Profile from './pages/Profile';
import TaskDetails from './pages/TaskDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} /> {/* Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/browse-tasks" element={<BrowseTasks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/task/:taskId" element={<TaskDetails />} />
        <Route path="*" element={<Landing />} /> {/* Fallback route */}
      </Routes>
    </Router>
  );
};

export default App;