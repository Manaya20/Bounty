const TaskService = require('../services/task.service');

class TaskController {
  async createTask(req, res) {
    try {
      const userId = req.user.id;
      const taskData = req.body;

      const newTask = await TaskService.createTask(taskData, userId);
      
      res.status(201).json({
        message: 'Task created successfully',
        task: newTask
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to create task', 
        details: error.message 
      });
    }
  }

  async getAllTasks(req, res) {
    try {
      const { status, skills } = req.query;
      const tasks = await TaskService.getTasks({ status, skills });
      
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to retrieve tasks', 
        details: error.message 
      });
    }
  }
}

module.exports = new TaskController();