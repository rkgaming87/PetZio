const Order = require('../models/Order');
const Delivery = require('../models/Delivery');
const Payment = require('../models/Payment');
const User = require('../models/User');

exports.placeOrder = async (req, res) => {
  try {
    const { items, total_amou, pay_method } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      user_id: req.user.id,
      items,
      total_amou,
    });

    const createdOrder = await order.save();

    // Create Payment Record
    await Payment.create({
      order_id: createdOrder._id,
      pay_method: pay_method || 'credit_card',
    });

    // Create Delivery Record
    const user = await User.findById(req.user.id);
    await Delivery.create({
      order_id: createdOrder._id,
      del_add: user.address,
    });

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user_id', 'username email');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Also fetch associated delivery and payment info
    const delivery = await Delivery.findOne({ order_id: order._id });
    const payment = await Payment.findOne({ order_id: order._id });

    res.json({
      order,
      delivery,
      payment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
