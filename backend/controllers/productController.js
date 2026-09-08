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
    let vendor = await Vendor.findOne({ user_id: req.user.id });
    if (!vendor) {
      // Auto-create a default vendor profile if missing for this user
      vendor = await Vendor.create({
        user_id: req.user.id,
        shop_name: 'My Pet Shop',
        shop_des: 'Pet supplies vendor',
        shop_add: 'Main Address'
      });
    }

    const product = new Product({
      ven_id: vendor._id,
      pro_name,
      category,
      price,
      image: image || 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=60',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVendorProducts = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user_id: req.user.id });
    if (!vendor) {
      return res.json([]);
    }
    const products = await Product.find({ ven_id: vendor._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { pro_name, category, price, image } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (pro_name !== undefined) product.pro_name = pro_name;
    if (category !== undefined) product.category = category;
    if (price !== undefined) product.price = price;
    if (image !== undefined) product.image = image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
