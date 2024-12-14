import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, deleteTask } from '../api';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    const loadTasks = async () => {
        try {
            const { data } = await fetchTasks();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error.response.data.message);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        await createTask(newTask);
        setNewTask({ title: '', description: '' });
        loadTasks();
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        loadTasks();
    };

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div>
            <h2>Task Dashboard</h2>
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title} - {task.description}
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
