require('dotenv').config();

const config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  JWT_SECRET: process.env.JWT_SECRET || 'your-fallback-secret'
};

// Validate required environment variables
const requiredVariables = ['SUPABASE_URL', 'SUPABASE_SERVICE_KEY'];
const missingVariables = requiredVariables.filter((key) => !config[key]);

if (missingVariables.length > 0) {
  console.error(`🚨 Missing required environment variables: ${missingVariables.join(', ')}`);
  process.exit(1); // Exit the application with an error code
}

module.exports = config;