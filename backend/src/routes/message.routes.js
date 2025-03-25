const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/message.controller');

router.get('/', MessageController.getAllMessages);
router.get('/:id', MessageController.getMessage);
router.post('/', MessageController.createMessage);
router.delete('/:id', MessageController.deleteMessage);

module.exports = router;