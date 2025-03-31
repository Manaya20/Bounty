const messageService = require('../services/message.service');

exports.getMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await messageService.getMessage(id);
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await messageService.getAllMessages();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createMessage = async (req, res) => {
    try {
        const messageData = req.body;
        const newMessage = await messageService.createMessage(messageData);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedMessage = await messageService.updateMessage(id, updatedData);
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        await messageService.deleteMessage(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};