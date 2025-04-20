require("dotenv").config();
const app = require("./app");
const { PORT, NODE_ENV } = require("./src/config/environment");
const supabaseClient = require("./src/config/SupabaseClient");
const morgan = require('morgan');

// Add request logging middleware
app.use(morgan('dev'));

// Add error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Add error handling for unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});

async function startServer() {
  try {
    console.log('🚀 Starting server...');
    console.log(`📡 Environment: ${NODE_ENV}`);
    console.log(`🔌 Port: ${PORT}`);
    
    // Test Supabase connection
    const isConnected = await supabaseClient.checkConnection();
    if (!isConnected) {
      throw new Error('Failed to connect to Supabase');
    }
    console.log('✅ Connected to Supabase');

    // Start the server with port fallback
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running in ${NODE_ENV} mode on port ${PORT}`);
      console.log(`🌐 Health check available at: http://localhost:${PORT}/health`);
      console.log(`🔑 Auth endpoints:`);
      console.log(`   - POST http://localhost:${PORT}/api/v1/auth/signup`);
      console.log(`   - POST http://localhost:${PORT}/api/v1/auth/login`);
      console.log(`   - GET  http://localhost:${PORT}/api/v1/auth/me`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Trying alternative port...`);
        // Try alternative port
        const altPort = PORT + 1;
        app.listen(altPort, () => {
          console.log(`✅ Server running in ${NODE_ENV} mode on port ${altPort}`);
          console.log(`🌐 Health check available at: http://localhost:${altPort}/health`);
          console.log(`🔑 Auth endpoints:`);
          console.log(`   - POST http://localhost:${altPort}/api/v1/auth/signup`);
          console.log(`   - POST http://localhost:${altPort}/api/v1/auth/login`);
          console.log(`   - GET  http://localhost:${altPort}/api/v1/auth/me`);
        });
      } else {
        console.error('❌ Server error:', err);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('💥 Server startup error:', error.message);
    process.exit(1);
  }
}

startServer();
