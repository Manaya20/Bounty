const TaskService = require('../services/task.service');

class TaskController {
  static async getAllTasks(req, res, next) {
    try {
      const tasks = await TaskService.getTasks();
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  }

  static async createTask(req, res, next) {
    try {
      const newTask = await TaskService.createTask(req.body);
      res.status(201).json(newTask);
    } catch (err) {
      next(err);
    }
  }
}

// Make sure to export properly
module.exports = TaskController;