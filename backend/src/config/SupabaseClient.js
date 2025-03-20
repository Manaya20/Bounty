const { createClient } = require('@supabase/supabase-js');
const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = require('./environment');

class SupabaseConfig {
  constructor() {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      throw new Error("Missing Supabase URL or Service Key.");
    }

    this.client = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
      auth: {
        persistSession: false
      }
    });
  }

  getInstance() {
    return this.client;
  }

  async checkConnection() {
    try {
      const { data, error } = await this.client
        .from('users')
        .select('id')
        .limit(1);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Supabase Connection Error:', error);
      return false;
    }
  }
}

// ✅ Export the class itself, not an instance
module.exports = SupabaseConfig;
