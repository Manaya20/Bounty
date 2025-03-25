import JWTUtils from '../utils/jwt.utils.js';
import ErrorResponse from '../utils/error.utils.js';

class AuthMiddleware {
  authenticate = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader?.startsWith('Bearer ')) {
        throw new ErrorResponse('Unauthorized', 401);
      }

      const token = authHeader.split(' ')[1];
      const decoded = JWTUtils.verifyToken(token);

      // Get user from DB
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', decoded.id)
        .single();

      if (error || !user) {
        throw new ErrorResponse('Unauthorized', 401);
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };

  authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        throw new ErrorResponse('Forbidden', 403);
      }
      next();
    };
  };
}

export default new AuthMiddleware();