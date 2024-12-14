import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchTasks } from './api';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    if (token) {
      // אם יש טוקן, טען את המשימות
      const loadTasks = async () => {
        const { data } = await fetchTasks();
        setTasks(data);
      };
      loadTasks();
    }
  }, [token]);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskList tasks={tasks} setTasks={setTasks} setTaskToEdit={setTaskToEdit} />} />
          <Route path="/task-form" element={<TaskForm taskToEdit={taskToEdit} setTasks={setTasks} />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
