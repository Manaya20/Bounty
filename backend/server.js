const app = require('./app');
const { PORT, NODE_ENV } = require('./config/environment');
const supabase = require('./config/supabase');

async function startServer() {
  try {
    // Check Supabase connection
    const isConnected = await supabase.checkConnection();
    
    if (!isConnected) {
      console.error('Failed to connect to Supabase');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
}

startServer();