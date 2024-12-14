import React, { useEffect, useState } from 'react';
import { deleteTask } from '../api';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);

    // הפונקציה fetchTasks - משיכת משימות מהשרת
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tasks');
            const data = await response.json();
            setTasks(data); // מעדכן את המשימות ב-state
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // שימוש ב-useEffect כדי לקרוא לפונקציה fetchTasks ברגע שהקומפוננטה נטענת
    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            // עדכון רשימת המשימות לאחר מחיקה
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = (task) => {
        setTaskToEdit(task); // עדכון המשימה לעריכה
    };

    return (
        <div>
            <h3>Task List</h3>
            {/* העברת fetchTasks כפרופס */}
            <TaskForm taskToEdit={taskToEdit} setTasks={setTasks} fetchTasks={fetchTasks} /> {/* צור או ערוך משימה */}
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong>{task.title}</strong>: {task.description}
                        <button onClick={() => handleEdit(task)}>Edit</button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
