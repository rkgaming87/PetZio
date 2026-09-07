const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env variables
dotenv.config();

// Import Models
const User = require('./models/User');
const Vendor = require('./models/Vendor');
const Admin = require('./models/Admin');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Delivery = require('./models/Delivery');
const Payment = require('./models/Payment');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Vendor.deleteMany();
    await Admin.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Delivery.deleteMany();
    await Payment.deleteMany();
    console.log('Cleared existing data.');

    // Create passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // 1. Create Users
    console.log('Creating users...');
    const adminUser = await User.create({
      username: 'AdminUser',
      email: 'admin@petzio.com',
      password: hashedPassword,
      role: 'admin',
      cont_num: '1111111111',
      address: 'Admin Headquarters',
    });

    const vendorUser = await User.create({
      username: 'PetSupplyCo',
      email: 'vendor@petzio.com',
      password: hashedPassword,
      role: 'vendor',
      cont_num: '2222222222',
      address: 'Vendor Warehouse',
    });

    const customerUser = await User.create({
      username: 'HappyPetOwner',
      email: 'customer@petzio.com',
      password: hashedPassword,
      role: 'user',
      cont_num: '3333333333',
      address: '123 Happy Bark Lane',
    });

    // 2. Create Admin Profile
    await Admin.create({
      user_id: adminUser._id,
      admin_level: 'super',
      permission: 'all',
    });

    // 3. Create Vendor Profile
    const vendorProfile = await Vendor.create({
      user_id: vendorUser._id,
      shop_name: 'Premium Pet Supplies Co.',
      shop_des: 'The best supplies for your furry friends.',
      shop_add: '456 Pet Trade Center',
    });

    // 4. Create 50+ Products
    console.log('Creating 50+ products...');
    const productsToInsert = [];
    const categories = ['Food', 'Toys', 'Accessories', 'Grooming', 'Bedding', 'Health'];
    const adjectives = ['Premium', 'Organic', 'Tasty', 'Durable', 'Soft', 'Healthy', 'Interactive', 'Luxury', 'Essential', 'Cozy'];
    const nouns = ['Dog Kibble', 'Cat Treats', 'Chew Toy', 'Feather Wand', 'Leather Collar', 'Harness', 'Shampoo', 'Brush', 'Memory Foam Bed', 'Vitamins'];

    for (let i = 0; i < 55; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const pro_name = `${adjective} ${noun} ${i + 1}`;
      const price = Math.floor(Math.random() * 100) + 10; // $10 - $109

      productsToInsert.push({
        ven_id: vendorProfile._id,
        pro_name,
        category,
        price,
        image: `https://loremflickr.com/300/300/pet,food?lock=${i + 1}`,
      });
    }

    const insertedProducts = await Product.insertMany(productsToInsert);
    console.log(`Successfully created ${insertedProducts.length} products.`);

    // 5. Create an Order for the Customer
    console.log('Creating sample order, delivery, and payment...');
    const sampleProduct1 = insertedProducts[0];
    const sampleProduct2 = insertedProducts[1];

    const order = await Order.create({
      user_id: customerUser._id,
      total_amou: sampleProduct1.price * 2 + sampleProduct2.price * 1,
      items: [
        { pro_id: sampleProduct1._id, qty: 2 },
        { pro_id: sampleProduct2._id, qty: 1 }
      ]
    });

    // 6. Create Delivery
    await Delivery.create({
      order_id: order._id,
      del_add: customerUser.address,
      del_status: 'shipped',
    });

    // 7. Create Payment
    await Payment.create({
      order_id: order._id,
      pay_method: 'credit_card',
    });

    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
