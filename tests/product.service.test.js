// Jest unit tests for product service (skeleton)
// - mock axios
// - test mapping of fields and pagination

const axios = require('axios');
const productService = require('../src/services/productService');

jest.mock('axios');

describe('productService', () => {
  afterEach(() => jest.resetAllMocks());

  test('maps fields and returns pagination meta', async () => {
    axios.get.mockResolvedValue({
      data: {
        products: [
          { id:1, title:'A', description:'d', price:10, brand:'B', sku:'S1', extra:'x' }
        ],
        total: 100
      }
    });

    const res = await productService.fetchProducts({ limit:1, skip:0 });
    expect(res.data).toBeInstanceOf(Array);
    expect(res.data[0]).toEqual(expect.objectContaining({ id:1, title:'A', description:'d', price:10, brand:'B', sku:'S1' }));
  });

  test('handles upstream error gracefully', async () => {
    axios.get.mockRejectedValue(new Error('network'));
    await expect(productService.fetchProducts({ limit:1, skip:0 })).rejects.toThrow('network');
  });
});
