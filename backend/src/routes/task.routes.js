const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task.controller');
const AuthMiddleware = require('../middleware/authMiddleware');

// Helper function to handle async errors properly
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post(
  '/tasks', 
  AuthMiddleware.authenticateUser,
  AuthMiddleware.authorizeRoles('client', 'admin'),
  asyncHandler(TaskController.createTask)  // Properly wrapping async function
);

router.get(
  '/tasks', 
  AuthMiddleware.authenticateUser,
  asyncHandler(TaskController.getAllTasks) // Properly wrapping async function
);

module.exports = router;
