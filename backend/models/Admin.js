const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  admin_level: {
    type: String,
    required: true,
  },
  permission: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
