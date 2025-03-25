const AuthService = require('../services/auth.service');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/error.utils');

class AuthController {
  static register = asyncHandler(async (req, res, next) => {
    try {
      const { user, tokens } = await AuthService.registerUser(req.body);
      res.status(201).json({
        status: 'success',
        data: { user, tokens }
      });
    } catch (err) {
      next(err);
    }
  });

  static login = asyncHandler(async (req, res, next) => {
    try {
      const { user, tokens } = await AuthService.loginUser(
        req.body.email,
        req.body.password
      );
      res.json({
        status: 'success',
        data: { user, tokens }
      });
    } catch (err) {
      next(err);
    }
  });

  static logout = asyncHandler(async (req, res, next) => {
    try {
      await AuthService.logoutUser(req.user.id);
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  });

  static refreshToken = asyncHandler(async (req, res, next) => {
    try {
      const tokens = await AuthService.refreshAuthToken(req.body.refreshToken);
      res.json({
        status: 'success',
        data: tokens
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = AuthController;