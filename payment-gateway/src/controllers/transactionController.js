// src/controllers/transactionController.js
const Transaction = require('../models/transactionModel');

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getTransactions };
