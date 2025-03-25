require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const logger = require('./src/utils/logger');

// Create Express app
const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.PRODUCTION_URL] 
    : ['http://localhost:3000']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10kb' }));

// Task routes
const taskRouter = require('./src/routes/task.routes');
app.use('/api/v1/tasks', taskRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// 404 handler
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error(`ERROR: ${err.message}`);
  
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Something went wrong'
  });
});

module.exports = app;