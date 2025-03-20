const TaskService = require('../services/task.service');

// Helper function to handle async errors properly
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error); // Pass error to Express error handler
  }
};

class TaskController {
  createTask = asyncHandler(async (req, res) => {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }

    const userId = req.user.id;
    const taskData = req.body;

    const newTask = await TaskService.createTask(taskData, userId);

    res.status(201).json({
      message: 'Task created successfully',
      task: newTask,
    });
  });

  getAllTasks = asyncHandler(async (req, res) => {
    const { status, skills } = req.query;

    const filters = {};
    if (status) filters.status = status;
    if (skills) filters.skills = Array.isArray(skills) ? skills : [skills]; // Ensure it's an array

    const tasks = await TaskService.getTasks(filters);

    res.json(tasks);
  });
}

module.exports = new TaskController();
