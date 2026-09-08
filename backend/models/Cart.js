const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Using 'id' string to map frontend mock product IDs easily
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  items: [cartItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
