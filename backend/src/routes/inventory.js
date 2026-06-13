const express = require('express');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

router.get('/', inventoryController.getAll);
router.post('/', inventoryController.create);

module.exports = router;
