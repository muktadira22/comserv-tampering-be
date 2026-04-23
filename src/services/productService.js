const axios = require('axios');

// Calls dummyjson (https://dummyjson.com/products) and maps fields
exports.getProducts = async ({ page = 1, limit = 10 } = {}) => {
  const parsedLimit = Math.max(1, Number(limit) || 10);
  const parsedPage = Math.max(1, Number(page) || 1);
  const skip = (parsedPage - 1) * parsedLimit;

  const url = 'https://dummyjson.com/products';
  try {
    const resp = await axios.get(url, { params: { limit: parsedLimit, skip } });
    const data = resp.data || {};
    const products = (data.products || []).map(p => ({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description
    }));

    const total = typeof data.total === 'number' ? data.total : products.length;
    const totalPages = Math.ceil(total / parsedLimit);

    return {
      meta: {
        page: parsedPage,
        limit: parsedLimit,
        total,
        totalPages
      },
      data: products
    };
  } catch (error) {
    throw error;
  }
};
