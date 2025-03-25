const SupabaseConfig = require('../config/SupabaseClient');

class UserService {
  static async getUsers(filters = {}) {
    let query = SupabaseConfig.client
      .from('users')
      .select(`
        id,
        email,
        phone,
        first_name,
        last_name,
        role,
        bio,
        created_at,
        updated_at
      `);

    // Apply filters
    if (filters.role) query = query.eq('role', filters.role);
    if (filters.email) query = query.ilike('email', `%${filters.email}%`);
    if (filters.phone) query = query.ilike('phone', `%${filters.phone}%`);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async createUser(userData) {
    // Validate required fields
    if (!userData.email || !userData.role) {
      throw new Error('Email and role are required');
    }

    // Validate role enum
    const validRoles = ['client', 'tasker', 'admin'];
    if (!validRoles.includes(userData.role)) {
      throw new Error(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
    }

    // Prepare insert data (explicitly omit id to let Supabase generate it)
    const insertData = {
      email: userData.email,
      role: userData.role,
      phone: userData.phone || null,
      first_name: userData.first_name || null,
      last_name: userData.last_name || null,
      bio: userData.bio || null,
      password_hash: userData.password_hash || null
    };

    const { data, error } = await SupabaseConfig.client
      .from('users')
      .insert(insertData)
      .select(`
        id,
        email,
        phone,
        first_name,
        last_name,
        role,
        bio,
        created_at
      `)
      .single();

    if (error) {
      // Handle unique constraint violations
      if (error.code === '23505') {
        if (error.message.includes('users_email_key')) {
          throw new Error('Email already exists');
        }
        if (error.message.includes('users_phone_key')) {
          throw new Error('Phone number already exists');
        }
      }
      throw error;
    }

    return data;
  }

  static async getUserById(userId) {
    const { data, error } = await SupabaseConfig.client
      .from('users')
      .select(`
        id,
        email,
        phone,
        first_name,
        last_name,
        role,
        bio,
        created_at,
        updated_at
      `)
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('User not found');
      }
      throw error;
    }
    return data;
  }

  static async updateUser(userId, updateData) {
    // Remove non-updatable fields
    const { id, email, created_at, password_hash, ...sanitizedData } = updateData;
    
    // Add updated_at timestamp
    sanitizedData.updated_at = new Date().toISOString();

    const { data, error } = await SupabaseConfig.client
      .from('users')
      .update(sanitizedData)
      .eq('id', userId)
      .select(`
        id,
        email,
        phone,
        first_name,
        last_name,
        role,
        bio
      `)
      .single();

    if (error) {
      // Handle unique constraint violations
      if (error.code === '23505') {
        if (error.message.includes('users_phone_key')) {
          throw new Error('Phone number already exists');
        }
      }
      throw error;
    }

    return data;
  }

  static async deleteUser(userId) {
    const { error } = await SupabaseConfig.client
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) throw error;
  }
}

module.exports = UserService;