const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  tran_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  pay_method: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'paypal', 'cash_on_delivery'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
