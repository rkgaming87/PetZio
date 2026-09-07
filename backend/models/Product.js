const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  ven_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  pro_name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
