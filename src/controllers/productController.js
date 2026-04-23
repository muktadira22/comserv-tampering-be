const productService = require('../services/productService');

// Export getProducts for tests expecting productController.getProducts
exports.getProducts = async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    // pass numbers to service
    const result = await productService.fetchProducts({ limit: Number(limit), skip: Number(skip) });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
