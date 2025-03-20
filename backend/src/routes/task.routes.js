const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task.controller');
const AuthMiddleware = require('../middleware/auth.middleware');

router.post(
  '/tasks', 
  AuthMiddleware.authenticateUser,
  AuthMiddleware.authorizeRoles('client', 'admin'),
  TaskController.createTask
);

router.get(
  '/tasks', 
  AuthMiddleware.authenticateUser,
  TaskController.getAllTasks
);

module.exports = router;