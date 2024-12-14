import axios from 'axios';

// יצירת אינסטנס של axios עם כתובת השרת
const API = axios.create({ baseURL: 'http://localhost:5000' });

// Interceptor כדי להוסיף את ה-Token לכל בקשה
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

// בקשות למשתמשים
export const register = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);

// בקשות למשימות
export const fetchTasks = () => API.get('/tasks');
export const createTask = (data) => API.post('/tasks', data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
