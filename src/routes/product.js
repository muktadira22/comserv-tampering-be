const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /product
router.get('/', productController.getProducts);

module.exports = router;
