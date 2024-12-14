import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../api';

const TaskForm = ({ taskToEdit, setTasks, fetchTasks }) => {
    const [task, setTask] = useState({ title: '', description: '' });

    useEffect(() => {
        if (taskToEdit) {
            setTask({ title: taskToEdit.title, description: taskToEdit.description });
        }
    }, [taskToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (taskToEdit) {
                // עריכת משימה קיימת
                await updateTask(taskToEdit.id, task);
            } else {
                // יצירת משימה חדשה
                await createTask(task);
            }
            setTask({ title: '', description: '' });
            // עדכון רשימת המשימות לאחר יצירה או עדכון
            fetchTasks(); // קריאה לפונקציה fetchTasks
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task Title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
            <input
                type="text"
                placeholder="Description"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
            />
            <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
        </form>
    );
};

export default TaskForm;
