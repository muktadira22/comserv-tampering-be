const express = require('express');
const axios = require('axios');
const productRoutes = require('./src/routes/product');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Simple CORS middleware allowing local dev origin(s)
app.use((req, res, next) => {
  const allowed = ['http://localhost:3003', 'http://127.0.0.1:3003'];
  const origin = req.headers.origin;
  if (allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Contoh endpoint root
app.get('/', (req, res) => {
  res.send('Server Express berjalan!');
});

// Contoh penggunaan axios (dummy endpoint)
app.get('/external', async (req, res) => {
  try {
    // Ganti URL di bawah dengan endpoint yang valid jika diperlukan
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data eksternal' });
  }
});

// Mount product routes at /product
app.use('/product', productRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
