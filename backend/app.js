import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import logger from './src/utils/logger.js';

// Import routes
import taskRouter from './src/routes/task.routes.js';
import authRouter from './src/routes/auth.routes.js';

const app = express();

// Middleware setup
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.PRODUCTION_URL] 
    : ['http://localhost:3000']
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/auth', authRouter);

// Health check
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

// Error handler
app.use((err, req, res, next) => {
  logger.error(`ERROR: ${err.message}`);
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Something went wrong'
  });
});

export default app;