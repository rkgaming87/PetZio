const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  total_amou: {
    type: Number,
    required: true,
  },
  items: [
    {
      pro_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      qty: {
        type: Number,
        required: true,
        default: 1,
      }
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
