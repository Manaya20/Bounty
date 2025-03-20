require('dotenv').config();
const JWTUtils = require('../utils/jwt.utils');

const JWT_SECRET = process.env.JWT_SECRET || JWTUtils.generateSecret();
module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  
  // Payment gateway configs
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  
  // Logging and monitoring
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};


