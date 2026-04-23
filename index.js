const express = require('express');
const axios = require('axios');
const productRoutes = require('./src/routes/product');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Use official cors middleware with allowlist for local dev
const cors = require('cors');
const allowedOrigins = ['http://localhost:3003', 'http://127.0.0.1:3003'];
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));


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
