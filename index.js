const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
