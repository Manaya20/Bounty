const MessageService = require('../services/message.service');

class MessageController {
  static async getAllMessages(req, res, next) {
    try {
      const messages = await MessageService.getMessages();
      res.json(messages);
    } catch (err) {
      next(err);
    }
  }

  static async getMessage(req, res, next) {
    try {
      const message = await MessageService.getMessage(req.params.id);
      res.json(message);
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

  static async deleteMessage(req, res, next) {
    try {
      await MessageService.deleteMessage(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MessageController;