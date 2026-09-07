const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('ven_id', 'shop_name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('ven_id', 'shop_name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { pro_name, category, price, image } = req.body;
    
    // Find the vendor linked to the logged in user
    const vendor = await Vendor.findOne({ user_id: req.user.id });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found for this user' });
    }

    const product = new Product({
      ven_id: vendor._id,
      pro_name,
      category,
      price,
      image,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
