// src/controllers/paymentController.js
const Payment = require('../models/paymentModel');
const Transaction = require('../models/transactionModel');

const createPayment = async (req, res) => {
  const { amount, currency, payment_method } = req.body;

  try {
    const payment = new Payment({
      user_id: req.user.id,
      amount,
      currency,
      payment_method,
      status: 'pending',
    });

    await payment.save();
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const processPayment = async (req, res) => {
  const { payment_id } = req.body;

  try {
    let payment = await Payment.findById(payment_id);
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    payment.status = 'completed';
    payment.updated_at = Date.now();
    await payment.save();

    const transaction = new Transaction({
      payment_id: payment.id,
      type: 'credit',
      status: 'completed',
    });

    await transaction.save();
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getPaymentStatus = async (req, res) => {
  const { payment_id } = req.params;

  try {
    const payment = await Payment.findById(payment_id);
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const handleRefund = async (req, res) => {
  const { payment_id } = req.body;

  try {
    let payment = await Payment.findById(payment_id);
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    payment.status = 'refunded';
    payment.updated_at = Date.now();
    await payment.save();

    const transaction = new Transaction({
      payment_id: payment.id,
      type: 'refund',
      status: 'completed',
    });

    await transaction.save();
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { createPayment, processPayment, getPaymentStatus, handleRefund };
