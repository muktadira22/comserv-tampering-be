const axios = require('axios');

// Calls dummyjson (https://dummyjson.com/products) and maps fields
// Expose fetchProducts for tests which expect signature fetchProducts({ limit, skip })
exports.fetchProducts = async (opts = {}) => {
  // Support both { page, limit } and { limit, skip }
  const { page, limit, skip } = opts;
  const parsedLimit = Math.max(1, Number(limit) || 10);
  const parsedSkip = typeof skip === 'number' ? Math.max(0, skip) : (Math.max(1, Number(page) || 1) - 1) * parsedLimit;

  const url = 'https://dummyjson.com/products';
  try {
    const resp = await axios.get(url, { params: { limit: parsedLimit, skip: parsedSkip } });
    const data = resp.data || {};
    const products = (data.products || []).map(p => ({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      brand: p.brand,
      sku: p.sku
    }));

    const total = typeof data.total === 'number' ? data.total : products.length;
    const totalPages = Math.ceil(total / parsedLimit);

    return {
      meta: {
        page: page ? Number(page) : Math.floor(parsedSkip / parsedLimit) + 1,
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
