const notificationService = require('../services/notification.service');

exports.getNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await notificationService.getNotification(id);
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createNotification = async (req, res) => {
    try {
        const notificationData = req.body;
        const newNotification = await notificationService.createNotification(notificationData);
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedNotification = await notificationService.updateNotification(id, updatedData);
        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        await notificationService.deleteNotification(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};