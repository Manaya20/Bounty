const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class JWTUtils {
  /**
   * Constructor for JWT utility
   * @param {string} secret - JWT secret key
   */
  constructor(secret) {
    this.secret = this.validateSecret(secret);
  }

  /**
   * Validate the JWT secret
   * @param {string} secret - Secret to validate
   * @returns {string} Validated secret
   */
  validateSecret(secret) {
    if (!secret || secret.length < 32) {
      throw new Error('Invalid JWT secret. Must be at least 32 characters long.');
    }
    return secret;
  }

  /**
   * Generate a JWT token
   * @param {Object} payload - Data to be encoded in the token
   * @param {Object} options - JWT signing options
   * @returns {string} Generated JWT token
   */
  generateToken(payload, options = {}) {
    const defaultOptions = {
      expiresIn: '1h'  // Token expires in 1 hour
    };

    return jwt.sign(
      payload, 
      this.secret, 
      { ...defaultOptions, ...options }
    );
  }

  /**
   * Verify a JWT token
   * @param {string} token - Token to verify
   * @returns {Object|null} Decoded token or null if verification fails
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return null;
    }
  }

  /**
   * Generate a cryptographically secure secret
   * @param {number} length - Length of the secret (default 64 characters)
   * @returns {string} Generated secret
   */
  static generateSecret(length = 64) {
    return crypto.randomBytes(length / 2).toString('hex');
  }

  /**
   * Create a token for user authentication
   * @param {Object} user - User object
   * @returns {string} Authentication token
   */
  createAuthToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.user_type
    };

    return this.generateToken(payload);
  }

  /**
   * Create a refresh token
   * @param {Object} user - User object
   * @returns {string} Refresh token
   */
  createRefreshToken(user) {
    const payload = {
      id: user.id,
      type: 'refresh'
    };

    return this.generateToken(payload, { expiresIn: '7d' });
  }
}

module.exports = JWTUtils;