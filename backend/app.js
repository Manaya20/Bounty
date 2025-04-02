require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const logger = require('./src/utils/logger');
const authMiddleware = require('./src/middleware/authMiddleware'); // Import auth middleware

// Create Express app
const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.PRODUCTION_URL] 
    : ['http://localhost:5000']
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

// Import and use all routes
const taskRouter = require('./src/routes/task.routes');
const messageRouter = require('./src/routes/message.routes');
const profileRouter = require('./src/routes/profile.routes');
const reviewRouter = require('./src/routes/review.routes');
const applicationRouter = require('./src/routes/application.routes');
const attachmentRouter = require('./src/routes/attachment.routes');
const notificationRouter = require('./src/routes/notification.routes');
const authRouter = require('./src/routes/auth.routes'); // Auth routes

// Register routes
app.use('/api/v1/tasks', authMiddleware.authenticate, taskRouter); // Protect tasks routes
app.use('/api/v1/messages', authMiddleware.authenticate, messageRouter); // Protect messages routes
app.use('/api/v1/profiles', authMiddleware.authenticate, profileRouter); // Protect profiles routes
app.use('/api/v1/reviews', authMiddleware.authenticate, reviewRouter); // Protect reviews routes
app.use('/api/v1/applications', authMiddleware.authenticate, applicationRouter); // Protect applications routes
app.use('/api/v1/attachments', authMiddleware.authenticate, attachmentRouter); // Protect attachments routes
app.use('/api/v1/notifications', authMiddleware.authenticate, notificationRouter); // Protect notifications routes
app.use('/api/v1/auth', authRouter); // Keep auth routes unprotected

// Health check endpoint (unprotected)
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