// src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  createPayment,
  processPayment,
  getPaymentStatus,
  handleRefund,
} = require('../controllers/paymentController');

router.post('/create', auth, createPayment);
router.post('/process', auth, processPayment);
router.get('/:payment_id', auth, getPaymentStatus);
router.post('/refund', auth, handleRefund);

module.exports = router;
