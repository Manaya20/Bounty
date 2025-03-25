import AuthService from '../services/auth.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/error.utils.js';

class AuthController {
  static register = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;
    
    const { user, tokens } = await AuthService.registerUser({
      email,
      password,
      role
    });

    res.status(201).json({
      status: 'success',
      data: {
        user,
        tokens
      }
    });
  });

  static login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const { user, tokens } = await AuthService.loginUser(email, password);

    res.json({
      status: 'success',
      data: {
        user,
        tokens
      }
    });
  });

  static logout = asyncHandler(async (req, res) => {
    await AuthService.logoutUser(req.user.id);
    res.status(204).json();
  });

  static refreshToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    
    const tokens = await AuthService.refreshAuthToken(refreshToken);

    res.json({
      status: 'success',
      data: tokens
    });
  });
}

export default AuthController;