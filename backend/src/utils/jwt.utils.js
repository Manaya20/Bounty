import jwt from 'jsonwebtoken';
import environment from '../config/environment.js';
const { JWT_SECRET } = environment;

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