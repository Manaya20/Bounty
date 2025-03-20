const JWTUtils = require('../utils/jwt.utils');
const { JWT_SECRET } = require('../config/environment');

class AuthService {
  constructor() {
    this.jwtUtils = new JWTUtils(JWT_SECRET);
  }

  async login(email, password) {
    // Authenticate user (e.g., with Supabase)
    const user = await this.authenticateUser(email, password);

    if (user) {
      const authToken = this.jwtUtils.createAuthToken(user);
      const refreshToken = this.jwtUtils.createRefreshToken(user);

      return { authToken, refreshToken };
    }

    throw new Error('Authentication failed');
  }

  verifyToken(token) {
    return this.jwtUtils.verifyToken(token);
  }
}

module.exports = new AuthService();