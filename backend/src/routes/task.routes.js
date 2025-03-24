const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task.controller');

// Verify all controller methods exist
router.get('/', TaskController.getAllTasks);
router.post('/', TaskController.createTask);
// Add other routes...

module.exports = router;