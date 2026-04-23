const productService = require('../services/productService');

exports.listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await productService.getProducts({ page: Number(page), limit: Number(limit) });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
