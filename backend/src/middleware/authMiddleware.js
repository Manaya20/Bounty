const supabase = require('../config/SupabaseClient');

class AuthMiddleware {
  async authenticateUser(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
      }

      const token = authHeader.split(' ')[1];
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
      res.status(500).json({ error: 'Authentication failed' });
    }
  }

  async authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
      const userRole = req.user.user_metadata.role;
      
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ 
          error: 'Access denied' 
        });
      }
      
      next();
    };
  }
}

module.exports = new AuthMiddleware();