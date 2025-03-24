require('dotenv').config();
const JWTUtils = require('../utils/jwt.utils');

const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_SERVICE_KEY', 'JWT_SECRET'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar] && process.env.NODE_ENV !== 'test') {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

module.exports = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  JWT_SECRET: process.env.JWT_SECRET || JWTUtils.generateSecret(),
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test'
};