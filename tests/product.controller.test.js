// Jest unit tests for product controller (skeleton)
// - mock service layer

const httpMocks = require('node-mocks-http');
const productController = require('../src/controllers/productController');

jest.mock('../src/services/productService');
const productService = require('../src/services/productService');

describe('productController', () => {
  afterEach(() => jest.resetAllMocks());

  test('responds with mapped data', async () => {
    productService.fetchProducts.mockResolvedValue({ data:[{ id:1, title:'A' }], total:1, limit:10, skip:0 });
    const req = httpMocks.createRequest({ method: 'GET', url: '/product', query: { limit: '1', skip: '0' } });
    const res = httpMocks.createResponse();

    await productController.getProducts(req, res);
    expect(res.statusCode).toBe(200);
    const json = res._getJSONData();
    expect(json.data).toBeDefined();
  });
});
