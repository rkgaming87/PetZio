const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, role, cont_num, address, shop_name, shop_des, shop_add, admin_level, permission } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username, email, password: hashedPassword, role: role || 'user', cont_num, address
    });

    if (user.role === 'vendor') {
      await Vendor.create({ user_id: user._id, shop_name, shop_des, shop_add });
    } else if (user.role === 'admin') {
      await Admin.create({ user_id: user._id, admin_level, permission });
    }

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
