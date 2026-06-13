const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const isAdmin = require('../middlewares/adminAuth');

const router = express.Router();

// Public routes - anyone can view categories
router.get('/', categoriesController.getAll);
router.get('/:id', categoriesController.getById);

// // Admin-only routes
router.post('/', isAdmin, categoriesController.create);
router.put('/:id', isAdmin, categoriesController.update);
router.delete('/:id', isAdmin, categoriesController.delete);

module.exports = router;
