const express = require('express');
const router = express.Router();
const { placeOrder, getOrderById, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, placeOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);

module.exports = router;
