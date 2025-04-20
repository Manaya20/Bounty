require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const logger = require("./src/utils/logger");
const authMiddleware = require("./src/middleware/authMiddleware");
const morgan = require('morgan');

// Create Express app
const app = express();

// Basic security middleware
app.use(helmet());

// Add request logging
app.use(morgan('dev'));

// CORS configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [process.env.PRODUCTION_URL]
        : ["http://localhost:3000", "http://localhost:5001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware with more detailed information
app.use((req, res, next) => {
  logger.info(`Incoming ${req.method} request to ${req.originalUrl}`);
  logger.debug('Request Headers:', req.headers);
  logger.debug('Request Body:', req.body);
  next();
});

// Import routes
const taskRouter = require("./src/routes/task.routes");
const messageRouter = require("./src/routes/message.routes");
const profileRouter = require("./src/routes/profile.routes");
const reviewRouter = require("./src/routes/review.routes");
const applicationRouter = require("./src/routes/application.routes");
const attachmentRouter = require("./src/routes/attachment.routes");
const notificationRouter = require("./src/routes/notification.routes");
const authRouter = require("./src/routes/auth.routes");

// API version prefix
const API_VERSION = '/api/v1';

// Health check endpoint (unprotected)
app.get("/health", (req, res) => {
  logger.info('Health check requested');
  res.status(200).json({
    status: "success",
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// Register routes with proper prefixes
app.use(`${API_VERSION}/auth`, authRouter); // Keep auth routes unprotected

// Protected routes with authentication middleware
const protectedRoutes = [
  { path: '/tasks', router: taskRouter },
  { path: '/messages', router: messageRouter },
  { path: '/profiles', router: profileRouter },
  { path: '/reviews', router: reviewRouter },
  { path: '/applications', router: applicationRouter },
  { path: '/attachments', router: attachmentRouter },
  { path: '/notifications', router: notificationRouter }
];

// Register protected routes
protectedRoutes.forEach(({ path, router }) => {
  app.use(`${API_VERSION}${path}`, authMiddleware.authenticate, router);
  logger.info(`Registered protected route: ${API_VERSION}${path}`);
});

// 404 handler - Must be placed after all valid routes
app.use((req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    status: "error",
    message: "Route not found",
    path: req.originalUrl,
    method: req.method
  });
});

// Global error handler - Must be placed last
app.use((err, req, res, next) => {
  logger.error('Error:', err);
  
  // Handle different types of errors
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized access",
      error: err.message
    });
  }
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      error: err.message
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

module.exports = app;
