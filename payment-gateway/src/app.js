// src/app.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

require('./docs/swagger')(app);

app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
