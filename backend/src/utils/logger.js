const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../../logs');

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logger = {
  info: (message) => {
    const timestamp = new Date().toISOString();
    console.log(`[INFO] ${timestamp}: ${message}`);
    fs.appendFileSync(path.join(logsDir, 'info.log'), `${timestamp}: ${message}\n`);
  },
  error: (message, error) => {
    const timestamp = new Date().toISOString();
    const errorMsg = error ? `${message} - ${error.message}` : message;
    console.error(`[ERROR] ${timestamp}: ${errorMsg}`);
    fs.appendFileSync(path.join(logsDir, 'error.log'), `${timestamp}: ${errorMsg}\n`);
  },
  warn: (message) => {
    const timestamp = new Date().toISOString();
    console.warn(`[WARN] ${timestamp}: ${message}`);
    fs.appendFileSync(path.join(logsDir, 'warn.log'), `${timestamp}: ${message}\n`);
  },
};

module.exports = logger;
