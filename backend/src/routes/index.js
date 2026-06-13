const express = require('express');

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK1', timestamp: new Date().toISOString() });
});

// Auth routes
router.use('/auth', require('./auth'));

// Inventory / asset tagging routes
router.use('/inventory', require('./inventory'));

// Departments management routes
router.use('/departments', require('./departments'));

module.exports = router;
