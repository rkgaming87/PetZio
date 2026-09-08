const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

// Create order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_TZRhDDrBRkDqwe',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'ql3IEYeBIo1GlBr495IYAk42',
    });

    const options = {
      amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await instance.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: 'Error creating Razorpay order' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error in /create-order:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
