const express = require('express');
const departmentsController = require('../controllers/departmentsController');
const isAdmin = require('../middlewares/adminAuth');

const router = express.Router();

// Public routes - anyone can view departments
router.get('/', departmentsController.getAll);
router.get('/:id', departmentsController.getById);

// Admin-only routes
router.post('/', isAdmin, departmentsController.create);
router.put('/:id', isAdmin, departmentsController.update);
router.delete('/:id', isAdmin, departmentsController.delete);

module.exports = router;
