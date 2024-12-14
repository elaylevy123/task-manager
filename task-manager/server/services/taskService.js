const Task = require('../models/task');

class TaskService {
    async getAllTasks(userId) {
        return await Task.findAll({ where: { userId } });
    }

    async createTask(data) {
        return await Task.create(data);
    }

    async updateTask(taskId, userId, data) {
        const task = await Task.findOne({ where: { id: taskId, userId } });
        if (!task) throw new Error('Task not found');
        return await task.update(data);
    }

    async deleteTask(taskId, userId) {
        const task = await Task.findOne({ where: { id: taskId, userId } });
        if (!task) throw new Error('Task not found');
        await task.destroy();
    }
}

module.exports = new TaskService();
