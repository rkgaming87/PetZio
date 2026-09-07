const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shop_name: {
    type: String,
    required: true,
  },
  shop_des: {
    type: String,
    required: true,
  },
  shop_add: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Vendor', vendorSchema);
