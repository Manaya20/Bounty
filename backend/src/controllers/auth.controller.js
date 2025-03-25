// src/controllers/auth.controller.js
import asyncHandler from '../utils/asyncHandler.js';
import AuthService from '../services/auth.service.js';
import ErrorResponse from '../utils/error.utils.js';

class AuthController {
  static register = asyncHandler(async (req, res) => {
    const { user, tokens } = await AuthService.registerUser(req.body);
    res.status(201).json({ status: 'success', data: { user, tokens } });
  });

  static login = asyncHandler(async (req, res) => {
    const { user, tokens } = await AuthService.loginUser(req.body.email, req.body.password);
    res.json({ status: 'success', data: { user, tokens } });
  });

  static logout = asyncHandler(async (req, res) => {
    await AuthService.logoutUser(req.user.id);
    res.status(204).json();
  });

  static refreshToken = asyncHandler(async (req, res) => {
    const tokens = await AuthService.refreshAuthToken(req.body.refreshToken);
    res.json({ status: 'success', data: tokens });
  });
}

export default AuthController;  