import 'dotenv/config';
import app from './app.js';
import { PORT, NODE_ENV } from './src/config/environment.js';
import supabase from './src/config/SupabaseClient.js';

async function startServer() {
  try {
    const isConnected = await supabase.checkConnection();
    
    if (!isConnected) {
      console.error('🚨 Failed to connect to Supabase');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`✅ Server running in ${NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('💥 Server startup error:', error);
    process.exit(1);
  }
}

startServer();