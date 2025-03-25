const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/message.controller');

router.get('/', MessageController.getMessages);
router.post('/', MessageController.createMessage);
router.patch('/:id/read', MessageController.markAsRead);

module.exports = router;