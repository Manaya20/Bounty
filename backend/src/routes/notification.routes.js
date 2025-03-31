const express = require('express');
const notificationController = require('../controllers/notification.controller');

const router = express.Router();

router.get('/:id', notificationController.getNotification);
router.post('/', notificationController.createNotification);
router.put('/:id', notificationController.updateNotification);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;