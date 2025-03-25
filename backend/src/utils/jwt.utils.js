// src/utils/jwt.utils.js
const { JWT_SECRET } = require('../config/environment');

class JWTUtils {
  static generateAuthTokens(user) {
    const jwt = require('jsonwebtoken');
    return {
      accessToken: jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '15m' }),
      refreshToken: jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' })
    };
  }
}

module.exports = JWTUtils;