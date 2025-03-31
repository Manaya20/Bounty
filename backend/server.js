require('dotenv').config();
const express = require('express');
const app = require('./app');
const { PORT, NODE_ENV } = require('./src/config/environment');
const supabaseClient = require('./src/config/SupabaseClient'); // Singleton instance

async function startServer() {
  try {
    const isConnected = await supabaseClient.checkConnection();

    if (!isConnected) {
      console.error('🚨 Failed to connect to Supabase');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`✅ Server running in ${NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('💥 Server startup error:', error.message);
    process.exit(1);
  }
}

startServer();