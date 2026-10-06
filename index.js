require('dotenv').config();
const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Mahasiswa berjalan. Buka /biodata untuk melihat data.');
});

// GET semua data biodata
app.get('/biodata', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM biodata ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});