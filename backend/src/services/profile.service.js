const SupabaseConfig = require('../config/SupabaseClient');

class ProfileService {
  static async getProfile(userId) {
    const { data, error } = await SupabaseConfig.client
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateProfile(userId, profileData) {
    const { data, error } = await SupabaseConfig.client
      .from('profiles')
      .update(profileData)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}

module.exports = ProfileService;