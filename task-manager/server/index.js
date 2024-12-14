const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/database');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// מסלולים
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// בדיקת חיבור ל-DB
db.sync({ alter: true }).then(() => {
    console.log('Database synced successfully');
}).catch(err => console.error('Database sync error:', err));
