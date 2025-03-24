const { JWT_SECRET } = require('../config/environment');
const JWTUtils = require('../utils/jwt.utils');
const supabase = require('../config/SupabaseClient');

class AuthMiddleware {
  constructor() {
    this.jwtUtils = new JWTUtils(JWT_SECRET);
  }

  async authenticateUser(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided or invalid format' });
      }

      const token = authHeader.split(' ')[1];
      
      // First try JWT verification
      const decoded = this.jwtUtils.verifyToken(token);
      if (decoded) {
        req.user = decoded;
        return next();
      }

      // Fallback to Supabase verification if JWT fails
      const { data: { user }, error } = await supabase
        .getInstance()
        .auth
        .getUser(token);

      if (error || !user) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  }

  authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const userRole = req.user.role || req.user.user_metadata?.role;
      
      if (!userRole || !allowedRoles.includes(userRole)) {
        return res.status(403).json({ 
          error: 'Access denied. Insufficient permissions.' 
        });
      }
      
      next();
    };
  }
}

module.exports = new AuthMiddleware();