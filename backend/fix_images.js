const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Product = require('./models/Product');

const fixImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for updating images...');

    const products = await Product.find({});
    
    let index = 1;
    for (const product of products) {
      if (product.image) {
        // Using loremflickr with 'pet,food' tags and a unique lock index for every image
        product.image = `https://loremflickr.com/300/300/pet,food?lock=${index}`;
        await product.save();
        index++;
      }
    }

    console.log('Successfully updated all product images!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating images:', error);
    process.exit(1);
  }
};

fixImages();
