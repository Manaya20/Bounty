const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task.controller');

router.get('/', TaskController.getAllTasks);
router.get('/search', TaskController.searchTasks);
router.get('/:id', TaskController.getTask);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

module.exports = router;