const MessageService = require('../services/message.service');

class MessageController {
  static async getMessages(req, res, next) {
    try {
      const messages = await MessageService.getMessages(req.query.task_id);
      res.json(messages);
    } catch (err) {
      next(err);
    }
  }

  static async createMessage(req, res, next) {
    try {
      const newMessage = await MessageService.createMessage(req.body);
      res.status(201).json(newMessage);
    } catch (err) {
      next(err);
    }
  }

  static async markAsRead(req, res, next) {
    try {
      const message = await MessageService.markAsRead(req.params.id);
      res.json(message);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MessageController;