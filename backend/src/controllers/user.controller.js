const UserService = require('../services/user.service');

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getUsers(req.query);
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  static async createUser(req, res, next) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;