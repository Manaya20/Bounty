const TaskService = require('../services/task.service');

class TaskController {
  static async getAllTasks(req, res, next) {
    try {
      const tasks = await TaskService.getTasks(req.query);
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  }

  static async getTask(req, res, next) {
    try {
      const task = await TaskService.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({ status: 'fail', message: 'Task not found' });
      }
      res.json(task);
    } catch (err) {
      next(err);
    }
  }

  static async createTask(req, res, next) {
    try {
      // For testing without auth - client_id is optional
      const taskData = {
        ...req.body,
        client_id: req.body.client_id || null
      };
      
      const newTask = await TaskService.createTask(taskData);
      res.status(201).json(newTask);
    } catch (err) {
      next(err);
    }
  }

  static async updateTask(req, res, next) {
    try {
      const updatedTask = await TaskService.updateTask(req.params.id, req.body);
      res.json(updatedTask);
    } catch (err) {
      next(err);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      await TaskService.deleteTask(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TaskController;