import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/environment.js';

class JWTUtils {
  static generateAuthTokens(user) {
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  static verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
  }
}

export default JWTUtils;