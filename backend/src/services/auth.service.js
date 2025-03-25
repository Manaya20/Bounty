import supabase from '../config/SupabaseClient.js';
import JWTUtils from '../utils/jwt.utils.js';
import logger from '../utils/logger.js';
import ErrorResponse from '../utils/error.utils.js';

class AuthService {
  static async registerUser({ email, password, role }) {
    try {
      // 1. Create user in Supabase Auth
      const { data: authUser, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role
          }
        }
      });

      if (authError) {
        throw new ErrorResponse(authError.message, 400);
      }

      // 2. Create user in public.users table
      const { data: dbUser, error: dbError } = await supabase
        .from('users')
        .insert({
          id: authUser.user.id,
          email,
          role
        })
        .select()
        .single();

      if (dbError) {
        // Rollback auth user if DB insert fails
        await supabase.auth.admin.deleteUser(authUser.user.id);
        throw new ErrorResponse(dbError.message, 400);
      }

      // 3. Generate tokens
      const tokens = JWTUtils.generateAuthTokens(dbUser);

      return {
        user: dbUser,
        tokens
      };
    } catch (error) {
      logger.error('Registration failed:', error);
      throw error;
    }
  }

  static async loginUser(email, password) {
    try {
      // 1. Authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw new ErrorResponse('Invalid credentials', 401);
      }

      // 2. Get user from public.users table
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError) {
        throw new ErrorResponse('User not found', 404);
      }

      // 3. Generate tokens
      const tokens = JWTUtils.generateAuthTokens(user);

      return {
        user,
        tokens
      };
    } catch (error) {
      logger.error('Login failed:', error);
      throw error;
    }
  }

  static async logoutUser(userId) {
    try {
      // Invalidate refresh token (implementation depends on your token strategy)
      await supabase
        .from('user_sessions')
        .delete()
        .eq('user_id', userId);
    } catch (error) {
      logger.error('Logout failed:', error);
      throw new ErrorResponse('Logout failed', 500);
    }
  }

  static async refreshAuthToken(refreshToken) {
    try {
      // Verify refresh token
      const decoded = JWTUtils.verifyToken(refreshToken);
      
      // Get user from DB
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', decoded.id)
        .single();

      if (error || !user) {
        throw new ErrorResponse('Invalid refresh token', 401);
      }

      // Generate new tokens
      return JWTUtils.generateAuthTokens(user);
    } catch (error) {
      logger.error('Token refresh failed:', error);
      throw new ErrorResponse('Invalid refresh token', 401);
    }
  }
}

export default AuthService;