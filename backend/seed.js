const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

// Models
const User = require('./models/User');
const Admin = require('./models/Admin');
const Vendor = require('./models/Vendor');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Delivery = require('./models/Delivery');
const Payment = require('./models/Payment');

const realisticProducts = [
  // Food
  { name: 'Royal Canin Maxi Puppy Dry Dog Food', category: 'Food', price: 65.99, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=300&h=300' },
  { name: 'Purina Pro Plan Adult Shredded Blend', category: 'Food', price: 48.50, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=300&h=300' },
  { name: 'Whiskas Kitten Ocean Fish Flavor', category: 'Food', price: 22.99, image: 'https://images.unsplash.com/photo-1623366302587-bca24d35ebaf?auto=format&fit=crop&q=80&w=300&h=300' },
  { name: 'Pedigree Chopped Ground Dinner', category: 'Food', price: 15.99, image: 'https://images.unsplash.com/photo-1608096275326-f7f57be2bd0c?auto=format&fit=crop&q=80&w=300&h=300' },
  { name: 'Meow Mix Seafood Medley Dry Cat Food', category: 'Food', price: 18.50, image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=300&h=300' },
  { name: 'Blue Buffalo Life Protection Formula', category: 'Food', price: 55.00, image: 'https://loremflickr.com/300/300/dog,food?lock=6' },
  { name: 'Hill\'s Science Diet Adult Sensitive Stomach', category: 'Food', price: 60.99, image: 'https://loremflickr.com/300/300/dog,food?lock=7' },
  { name: 'Fancy Feast Grilled Seafood Feast', category: 'Food', price: 19.99, image: 'https://loremflickr.com/300/300/cat,food?lock=8' },
  { name: 'Iams ProActive Health Adult Minichunks', category: 'Food', price: 35.99, image: 'https://loremflickr.com/300/300/dog,food?lock=9' },
  { name: 'Wellness CORE Grain-Free Dry Cat Food', category: 'Food', price: 42.99, image: 'https://loremflickr.com/300/300/cat,food?lock=10' },

  // Toys
  { name: 'KONG Classic Dog Toy', category: 'Toys', price: 13.99, image: 'https://loremflickr.com/300/300/dog,toy?lock=11' },
  { name: 'SmartyKat Skitter Critters Catnip Mice', category: 'Toys', price: 6.99, image: 'https://loremflickr.com/300/300/cat,toy?lock=12' },
  { name: 'Nylabone DuraChew Textured Ring', category: 'Toys', price: 8.50, image: 'https://loremflickr.com/300/300/dog,toy?lock=13' },
  { name: 'Frisco Fetch Squeaking Tennis Balls', category: 'Toys', price: 9.99, image: 'https://loremflickr.com/300/300/dog,ball?lock=14' },
  { name: 'Petstages Tower of Tracks Cat Toy', category: 'Toys', price: 15.49, image: 'https://loremflickr.com/300/300/cat,toy?lock=15' },
  { name: 'Chuckit! Ultra Rubber Ball Dog Toy', category: 'Toys', price: 7.99, image: 'https://loremflickr.com/300/300/dog,ball?lock=16' },
  { name: 'Ethical Pet Colorful Springs Cat Toy', category: 'Toys', price: 5.99, image: 'https://loremflickr.com/300/300/cat,toy?lock=17' },
  { name: 'ZippyPaws Hide-and-Seek Plush Dog Toy', category: 'Toys', price: 18.99, image: 'https://loremflickr.com/300/300/dog,plush?lock=18' },
  { name: 'Cat Dancer Original Interactive Cat Toy', category: 'Toys', price: 4.99, image: 'https://loremflickr.com/300/300/cat,toy?lock=19' },
  { name: 'Outward Hound Interactive Puzzle Toy', category: 'Toys', price: 19.99, image: 'https://loremflickr.com/300/300/dog,puzzle?lock=20' },

  // Accessories
  { name: 'Adjustable Nylon Dog Collar - Red', category: 'Accessories', price: 11.99, image: 'https://loremflickr.com/300/300/dog,collar?lock=21' },
  { name: 'Reflective Cat Harness with Leash', category: 'Accessories', price: 16.50, image: 'https://loremflickr.com/300/300/cat,harness?lock=22' },
  { name: 'Retractable Dog Leash 16ft', category: 'Accessories', price: 22.99, image: 'https://loremflickr.com/300/300/dog,leash?lock=23' },
  { name: 'Stainless Steel Non-Slip Pet Bowl', category: 'Accessories', price: 9.99, image: 'https://loremflickr.com/300/300/pet,bowl?lock=24' },
  { name: 'Automatic Pet Feeder with Timer', category: 'Accessories', price: 65.00, image: 'https://loremflickr.com/300/300/pet,feeder?lock=25' },
  { name: 'Personalized Pet ID Tag - Bone Shape', category: 'Accessories', price: 7.99, image: 'https://loremflickr.com/300/300/dog,tag?lock=26' },
  { name: 'Waterproof Car Seat Cover for Pets', category: 'Accessories', price: 34.99, image: 'https://loremflickr.com/300/300/dog,car?lock=27' },
  { name: 'Travel Pet Carrier Backpack', category: 'Accessories', price: 45.99, image: 'https://loremflickr.com/300/300/cat,carrier?lock=28' },
  { name: 'LED Glowing Dog Collar for Night Walks', category: 'Accessories', price: 14.99, image: 'https://loremflickr.com/300/300/dog,collar?lock=29' },
  { name: 'Ceramic Cat Water Fountain', category: 'Accessories', price: 39.99, image: 'https://loremflickr.com/300/300/cat,fountain?lock=30' },

  // Grooming
  { name: 'Earthbath Oatmeal & Aloe Pet Shampoo', category: 'Grooming', price: 16.99, image: 'https://loremflickr.com/300/300/dog,shampoo?lock=31' },
  { name: 'FURminator Deshedding Tool for Dogs', category: 'Grooming', price: 35.50, image: 'https://loremflickr.com/300/300/dog,brush?lock=32' },
  { name: 'Professional Pet Nail Clippers', category: 'Grooming', price: 12.99, image: 'https://loremflickr.com/300/300/pet,clippers?lock=33' },
  { name: 'Pogi\'s Grooming Wipes for Dogs & Cats', category: 'Grooming', price: 14.99, image: 'https://loremflickr.com/300/300/pet,wipes?lock=34' },
  { name: 'Arm & Hammer Dog Dental Care Kit', category: 'Grooming', price: 9.99, image: 'https://loremflickr.com/300/300/dog,toothbrush?lock=35' },
  { name: 'Burt\'s Bees Tearless Kitten Shampoo', category: 'Grooming', price: 11.50, image: 'https://loremflickr.com/300/300/cat,shampoo?lock=36' },
  { name: 'Self-Cleaning Slicker Brush', category: 'Grooming', price: 15.99, image: 'https://loremflickr.com/300/300/pet,brush?lock=37' },
  { name: 'Veterinary Formula Clinical Care Spray', category: 'Grooming', price: 18.99, image: 'https://loremflickr.com/300/300/dog,spray?lock=38' },
  { name: 'Cat Grooming Glove - Gentle Deshedding', category: 'Grooming', price: 8.99, image: 'https://loremflickr.com/300/300/cat,glove?lock=39' },
  { name: 'TropicClean Oral Care Water Additive', category: 'Grooming', price: 17.50, image: 'https://loremflickr.com/300/300/pet,dental?lock=40' },

  // Bedding
  { name: 'Furhaven Orthopedic Memory Foam Dog Bed', category: 'Bedding', price: 49.99, image: 'https://loremflickr.com/300/300/dog,bed?lock=41' },
  { name: 'Best Friends by Sheri Calming Donut Bed', category: 'Bedding', price: 35.99, image: 'https://loremflickr.com/300/300/pet,bed?lock=42' },
  { name: 'Coolaroo Elevated Cooling Pet Cot', category: 'Bedding', price: 29.50, image: 'https://loremflickr.com/300/300/dog,cot?lock=43' },
  { name: 'K&H Pet Products Cat Window Perch', category: 'Bedding', price: 24.99, image: 'https://loremflickr.com/300/300/cat,window?lock=44' },
  { name: 'Snoozer Cozy Cave Pet Bed', category: 'Bedding', price: 89.99, image: 'https://loremflickr.com/300/300/dog,bed?lock=45' },
  { name: 'MidWest Homes Deluxe Pet Bed', category: 'Bedding', price: 19.99, image: 'https://loremflickr.com/300/300/pet,bed?lock=46' },
  { name: 'Fleece Pet Blanket - Machine Washable', category: 'Bedding', price: 12.99, image: 'https://loremflickr.com/300/300/pet,blanket?lock=47' },
  { name: 'Shark Shape Enclosed Cat Bed', category: 'Bedding', price: 22.99, image: 'https://loremflickr.com/300/300/cat,bed?lock=48' },

  // Health
  { name: 'Seresto Flea and Tick Prevention Collar', category: 'Health', price: 59.99, image: 'https://loremflickr.com/300/300/dog,collar?lock=49' },
  { name: 'Zesty Paws Multivitamin Chews for Dogs', category: 'Health', price: 26.50, image: 'https://loremflickr.com/300/300/dog,vitamins?lock=50' },
  { name: 'Nutramax Cosequin Joint Health Supplement', category: 'Health', price: 38.99, image: 'https://loremflickr.com/300/300/pet,health?lock=51' },
  { name: 'Purina Pro Plan Veterinary Supplements', category: 'Health', price: 42.00, image: 'https://loremflickr.com/300/300/dog,health?lock=52' },
  { name: 'Feliway Classic Cat Calming Pheromone', category: 'Health', price: 34.99, image: 'https://loremflickr.com/300/300/cat,calming?lock=53' },
  { name: 'VetriScience Composure Behavioral Chews', category: 'Health', price: 21.99, image: 'https://loremflickr.com/300/300/pet,chews?lock=54' },
  { name: 'PetArmor Plus for Dogs Flea Treatment', category: 'Health', price: 29.99, image: 'https://loremflickr.com/300/300/dog,flea?lock=55' }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // 1. CLEAR DATABASE
    await User.deleteMany({});
    await Admin.deleteMany({});
    await Vendor.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Delivery.deleteMany({});
    await Payment.deleteMany({});
    console.log('Cleared existing database records.');

    // 2. CREATE USERS
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    const customerUser = await User.create({
      username: 'John Customer',
      email: 'customer@petzio.com',
      password: passwordHash,
      role: 'user',
      cont_num: '1234567890',
      address: '123 Pet Street, Dogwood City, CA'
    });

    const vendorUser = await User.create({
      username: 'Jane Vendor',
      email: 'vendor@petzio.com',
      password: passwordHash,
      role: 'vendor',
      cont_num: '0987654321',
      address: '456 Supply Ave, Catburg, NY'
    });

    const adminUser = await User.create({
      username: 'Admin Boss',
      email: 'admin@petzio.com',
      password: passwordHash,
      role: 'admin',
      cont_num: '5555555555',
      address: '789 Headquarters Blvd, PetZio City'
    });

    const vendorProfile = await Vendor.create({
      user_id: vendorUser._id,
      shop_name: 'Jane\'s Premium Pet Supplies',
      shop_des: 'The best quality pet items since 2026.',
      shop_add: '456 Supply Ave, Catburg, NY',
      status: 'active'
    });

    // 3. CREATE HIGH-QUALITY PRODUCTS
    const productsToInsert = realisticProducts.map(p => ({
      ven_id: vendorProfile._id,
      pro_name: p.name,
      category: p.category,
      price: p.price,
      image: p.image
    }));

    const insertedProducts = await Product.insertMany(productsToInsert);
    console.log(`Created ${insertedProducts.length} high-quality products.`);

    // 4. CREATE SAMPLE ORDERS
    const sampleProduct1 = insertedProducts[0];
    const sampleProduct2 = insertedProducts[10]; 

    const order = await Order.create({
      user_id: customerUser._id,
      ven_id: vendorProfile._id,
      order_date: new Date(),
      total_amou: sampleProduct1.price + sampleProduct2.price
    });

    await Delivery.create({
      order_id: order._id,
      del_status: 'shipped',
      del_add: customerUser.address,
      del_date: new Date(Date.now() + 86400000 * 2) 
    });

    await Payment.create({
      order_id: order._id,
      amount: order.total_amou,
      pay_method: 'credit_card',
      pay_status: 'completed'
    });

    console.log('Created sample orders, delivery, and payment records.');
    console.log('SEEDING COMPLETE!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
