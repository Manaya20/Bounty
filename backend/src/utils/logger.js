const { LOG_LEVEL } = require('../config/environment');
const pino = require('pino');

const levels = {
  error: 50,
  warn: 40,
  info: 30,
  debug: 20,
  trace: 10
};

const logger = pino({
  level: LOG_LEVEL,
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
  formatters: {
    level: (label) => ({ level: label.toUpperCase() })
  },
  customLevels: levels
});

module.exports = logger;