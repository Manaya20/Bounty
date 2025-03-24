const pino = require('pino');
const { LOG_LEVEL } = require('../config/environment');

// Standard Pino logger with default levels
const logger = pino({
  level: LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
      ignore: 'pid,hostname'
    }
  }
});

module.exports = logger;