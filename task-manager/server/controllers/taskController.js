const taskService = require('../services/taskService');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks(req.user.id);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = await taskService.createTask({
            title,
            description,
            userId: req.user.id,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const task = await taskService.updateTask(req.params.id, req.user.id, {
            title,
            description,
            status,
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.id, req.user.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
