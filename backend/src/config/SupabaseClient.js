const { createClient } = require('@supabase/supabase-js');
const { SUPABASE_URL, SUPABASE_KEY } = require('./environment');
const logger = require('../utils/logger');

class SupabaseConfig {
  constructor() {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error("Missing Supabase URL or Key.");
    }

    logger.info('🔌 Initializing Supabase client...');
    logger.info('📡 Supabase URL:', SUPABASE_URL);

    this.client = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: true,
        detectSessionInUrl: false,
        storage: {
          getItem: (key) => {
            try {
              return null;
            } catch (error) {
              logger.error('Error getting item from storage:', error);
              return null;
            }
          },
          setItem: (key, value) => {
            // We don't store sessions in the backend
          },
          removeItem: (key) => {
            // We don't store sessions in the backend
          }
        }
      },
      db: {
        schema: 'public'
      }
    });

    logger.info('✅ Supabase client initialized');
  }

  getInstance() {
    return this.client;
  }

  async checkConnection() {
    try {
      logger.info('🔍 Checking Supabase connection...');

      // Test database connection
      const { data: dbData, error: dbError } = await this.client
        .from('profiles')
        .select('*')
        .limit(1);

      if (dbError) {
        logger.error('❌ Database connection error:', dbError);
        return false;
      }

      // Test auth connection
      const { data: { session }, error: authError } = await this.client.auth.getSession();
      
      if (authError) {
        logger.error('❌ Auth connection error:', authError);
        return false;
      }

      logger.info('✅ Supabase connection successful');
      return true;
    } catch (error) {
      logger.error('❌ Supabase Connection Error:', error.message);
      return false;
    }
  }
}

// Export a single instance
module.exports = new SupabaseConfig();