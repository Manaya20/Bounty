const SupabaseConfig = require('../config/SupabaseClient');
const JWTUtils = require('../utils/jwt.utils');

class AuthService {
  static async registerUser({ email, password, role }) {
    const { data: authUser, error: authError } = await SupabaseConfig.client.auth.signUp({
      email,
      password,
      options: {
        data: {
          role
        }
      }
    });

    if (authError) throw authError;

    const { data: dbUser, error: dbError } = await SupabaseConfig.client
      .from('users')
      .insert({
        id: authUser.user.id,
        email,
        role
      })
      .select()
      .single();

    if (dbError) {
      await SupabaseConfig.client.auth.admin.deleteUser(authUser.user.id);
      throw dbError;
    }

    const tokens = JWTUtils.generateAuthTokens(dbUser);
    return { user: dbUser, tokens };
  }

  static async loginUser(email, password) {
    const { data, error } = await SupabaseConfig.client.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    const { data: user, error: userError } = await SupabaseConfig.client
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (userError) throw userError;

    const tokens = JWTUtils.generateAuthTokens(user);
    return { user, tokens };
  }

  static async logoutUser(userId) {
    const { error } = await SupabaseConfig.client
      .from('user_sessions')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
  }

  static async refreshAuthToken(refreshToken) {
    const decoded = JWTUtils.verifyToken(refreshToken);
    
    const { data: user, error } = await SupabaseConfig.client
      .from('users')
      .select('*')
      .eq('id', decoded.id)
      .single();

    if (error || !user) throw new Error('Invalid refresh token');

    return JWTUtils.generateAuthTokens(user);
  }
}

module.exports = AuthService;