const attachmentService = require('../services/attachment.service');

exports.getAttachment = async (req, res) => {
    try {
        const { id } = req.params;
        const attachment = await attachmentService.getAttachment(id);
        res.status(200).json(attachment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllAttachments = async (req, res) => {
    try {
        const attachments = await attachmentService.getAllAttachment();
        res.status(200).json(attachments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.createAttachment = async (req, res) => {
    try {
        const attachmentData = req.body;
        const newAttachment = await attachmentService.createAttachment(attachmentData);
        res.status(201).json(newAttachment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAttachment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedAttachment = await attachmentService.updateAttachment(id, updatedData);
        res.status(200).json(updatedAttachment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAttachment = async (req, res) => {
    try {
        const { id } = req.params;
        await attachmentService.deleteAttachment(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};