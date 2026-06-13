const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Profile route (protected)
router.get('/profile', (req, res) => {
  // This would need authentication middleware
  res.json({ message: 'Profile route - implement auth middleware' });
});

module.exports = router;