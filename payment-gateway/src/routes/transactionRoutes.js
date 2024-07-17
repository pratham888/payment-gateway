// src/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { getTransactions } = require('../controllers/transactionController');

router.get('/', auth, getTransactions);

module.exports = router;
