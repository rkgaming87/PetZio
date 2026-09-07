const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  del_date: {
    type: Date,
  },
  del_add: {
    type: String,
    required: true,
  },
  del_status: {
    type: String,
    required: true,
    enum: ['processing', 'shipped', 'out_for_delivery', 'delivered'],
    default: 'processing'
  },
}, { timestamps: true });

module.exports = mongoose.model('Delivery', deliverySchema);
