//משמש לדף הבית של האפליקציה, מספק למשתמשים קישורים לדפים אחרים כמו התחברות ורישום
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to Task Manager</h1>
            <p>Manage your tasks efficiently</p>
            <div>
                <Link to="/login">Login</Link>
                <span> | </span>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
};

export default Home;
