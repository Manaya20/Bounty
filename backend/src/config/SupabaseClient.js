const { createClient } = require('@supabase/supabase-js');
const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = require('./environment');

class SupabaseConfig {
  constructor() {
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

module.exports = new SupabaseConfig();