const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { NODE_ENV } = require('./src/config/environment');
const logger = require('./src/utils/logger');

// Route imports
const taskRoutes = require("./src/routes/task.routes");
const userRoutes = require('./src/routes/user.routes.js');

const app = express();

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: NODE_ENV === 'production' 
    ? ['https://your-production-domain.com'] 
    : ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request logging
app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Rate limiting - stricter in production
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: NODE_ENV === 'production' ? 100 : 200, // different limits for dev/prod
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again later'
  }
});
app.use(limiter);

// Compression
app.use(compression({
  level: 6, // Optimal compression level
  threshold: '1kb' // Only compress responses larger than 1kb
}));

// Body parsing
app.use(express.json({ limit: '10kb' })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// API routes - versioned
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.stack}`);
  
  const statusCode = err.statusCode || 500;
  const message = NODE_ENV === 'production' 
    ? 'Something went wrong!' 
    : err.message;

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    requestedUrl: req.originalUrl
  });
});

module.exports = app;