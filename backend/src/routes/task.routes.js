const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task.controller');
const AuthMiddleware = require('../middleware/authMiddleware');

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

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router;