const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => console.log("Berhasil terhubung ke MongoDB"))
    .catch(err => console.log("Gagal terhubung ke MongoDB:", err));

// Rute API akan ditambahkan di sini

app.listen(PORT, () => {
    console.log(`Server berjalan di port: ${PORT}`);
});