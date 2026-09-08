const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// GET cart by user ID
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    let cart = await Cart.findOne({ userId });
    
    // Return empty array if no cart exists yet
    if (!cart) {
      return res.json({ items: [] });
    }
    
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST to update/sync cart
router.post('/:userId', async (req, res) => {
  try {
    console.log('--- CART POST ROUTE HIT ---');
    console.log('User ID:', req.params.userId);
    
    const { userId } = req.params;
    const { items } = req.body; // Full array of cart items

    // Upsert (update or create) the user's cart
    let cart = await Cart.findOneAndUpdate(
      { userId },
      { items },
      { new: true, upsert: true }
    );

    console.log('Successfully saved cart to database.');
    res.json(cart);
  } catch (error) {
    console.error('Backend Error updating cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE entirely clear cart
router.delete('/:userId/clear', async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.findOneAndDelete({ userId });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
