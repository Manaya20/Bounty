const { createClient } = require('@supabase/supabase-js');
const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = require('./environment');

class SupabaseConfig {
  constructor() {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      throw new Error("Missing Supabase URL or Service Key.");
    }

    this.client = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });
  }

  getInstance() {
    return this.client;
  }

  async checkConnection() {
    try {
      const { data, error } = await this.client
        .from('users') // Replace 'users' with a table in your database
        .select('*')
        .limit(1);

      if (error) throw error;
      return !!data;
    } catch (error) {
      console.error('Supabase Connection Error:', error.message);
      return false;
    }
  }
}

// Export a single instance
module.exports = new SupabaseConfig();