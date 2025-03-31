const taskService = require('../services/task.service');

exports.getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskService.getTask(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const taskData = req.body;
        const newTask = await taskService.createTask(taskData);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedTask = await taskService.updateTask(id, updatedData);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await taskService.deleteTask(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};