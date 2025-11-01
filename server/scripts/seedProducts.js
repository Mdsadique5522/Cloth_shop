import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const products = [
  {
    name: 'Kurti',
    category: 'women',
    image: '/assets/women1.jfif',
    new_price: 50.0,
    old_price: 80.5,
    description: 'Comfortable and stylish kurti for everyday wear',
    inStock: true,
    stockQuantity: 50,
  },
  {
    name: 'Jeans',
    category: 'men',
    image: '/assets/men1.webp',
    new_price: 60.0,
    old_price: 90.5,
    description: 'Classic fit jeans for men',
    inStock: true,
    stockQuantity: 30,
  },
  {
    name: 'Saree',
    category: 'women',
    image: '/assets/women2.jpg',
    new_price: 75.0,
    old_price: 120.0,
    description: 'Elegant traditional saree',
    inStock: true,
    stockQuantity: 25,
  },
  {
    name: 'Jacket',
    category: 'men',
    image: '/assets/men2.jpg',
    new_price: 90.0,
    old_price: 140.0,
    description: 'Warm and stylish jacket',
    inStock: true,
    stockQuantity: 20,
  },
  {
    name: 'T-Shirt',
    category: 'men',
    image: '/assets/men3.webp',
    new_price: 45.0,
    old_price: 70.0,
    description: 'Comfortable cotton t-shirt',
    inStock: true,
    stockQuantity: 100,
  },
  {
    name: 'Dress',
    category: 'women',
    image: '/assets/women3.jpg',
    new_price: 85.0,
    old_price: 130.0,
    description: 'Beautiful summer dress',
    inStock: true,
    stockQuantity: 40,
  },
  {
    name: 'Hoodie',
    category: 'men',
    image: '/assets/men4.jfif',
    new_price: 95.0,
    old_price: 150.0,
    description: 'Cozy hoodie for casual wear',
    inStock: true,
    stockQuantity: 35,
  },
  {
    name: 'Leggings',
    category: 'women',
    image: '/assets/women4.webp',
    new_price: 55.0,
    old_price: 100.0,
    description: 'Comfortable leggings',
    inStock: true,
    stockQuantity: 60,
  },
  {
    name: 'Shirt',
    category: 'men',
    image: '/assets/men5.webp',
    new_price: 70.0,
    old_price: 110.0,
    description: 'Formal shirt for men',
    inStock: true,
    stockQuantity: 45,
  },
  {
    name: 'Jumpsuit',
    category: 'women',
    image: '/assets/women5.webp',
    new_price: 88.0,
    old_price: 135.0,
    description: 'Trendy jumpsuit',
    inStock: true,
    stockQuantity: 30,
  },
  {
    name: 'Sweater',
    category: 'men',
    image: '/assets/men6.webp',
    new_price: 92.0,
    old_price: 145.0,
    description: 'Warm sweater for winter',
    inStock: true,
    stockQuantity: 25,
  },
  {
    name: 'Gown',
    category: 'women',
    image: '/assets/women6.webp',
    new_price: 99.0,
    old_price: 160.0,
    description: 'Elegant evening gown',
    inStock: true,
    stockQuantity: 20,
  },
  {
    name: 'Shorts',
    category: 'men',
    image: '/assets/men7.jfif',
    new_price: 40.0,
    old_price: 65.0,
    description: 'Casual shorts',
    inStock: true,
    stockQuantity: 50,
  },
  {
    name: 'Top',
    category: 'women',
    image: '/assets/women7.webp',
    new_price: 52.0,
    old_price: 85.0,
    description: 'Stylish top',
    inStock: true,
    stockQuantity: 55,
  },
  {
    name: 'Kurta',
    category: 'men',
    image: '/assets/men8.jpg',
    new_price: 78.0,
    old_price: 115.0,
    description: 'Traditional kurta',
    inStock: true,
    stockQuantity: 30,
  },
  {
    name: 'Skirt',
    category: 'women',
    image: '/assets/women8.jfif',
    new_price: 73.0,
    old_price: 110.0,
    description: 'Classic skirt',
    inStock: true,
    stockQuantity: 40,
  },
  {
    name: 'Denim Shirt',
    category: 'kid',
    image: '/assets/kid1.jpg',
    new_price: 85.0,
    old_price: 140.0,
    description: 'Kids denim shirt',
    inStock: true,
    stockQuantity: 35,
  },
  {
    name: 'Cargo Pants',
    category: 'kid',
    image: '/assets/kid2.jfif',
    new_price: 88.0,
    old_price: 130.0,
    description: 'Kids cargo pants',
    inStock: true,
    stockQuantity: 30,
  },
  {
    name: 'Trousers',
    category: 'kid',
    image: '/assets/kid3.jfif',
    new_price: 76.0,
    old_price: 120.0,
    description: 'Kids trousers',
    inStock: true,
    stockQuantity: 40,
  },
  {
    name: 'Tank Top',
    category: 'kid',
    image: '/assets/kid4.webp',
    new_price: 49.0,
    old_price: 80.0,
    description: 'Kids tank top',
    inStock: true,
    stockQuantity: 50,
  },
  {
    name: 'Formal Pants',
    category: 'kid',
    image: '/assets/kid5.jfif',
    new_price: 98.0,
    old_price: 160.0,
    description: 'Kids formal pants',
    inStock: true,
    stockQuantity: 25,
  },
  {
    name: 'Leather Jacket',
    category: 'kid',
    image: '/assets/kid6.jfif',
    new_price: 150.0,
    old_price: 250.0,
    description: 'Kids leather jacket',
    inStock: true,
    stockQuantity: 15,
  },
  {
    name: 'Gym Shorts',
    category: 'kid',
    image: '/assets/kid7.webp',
    new_price: 55.0,
    old_price: 90.0,
    description: 'Kids gym shorts',
    inStock: true,
    stockQuantity: 45,
  },
  {
    name: 'Casual Blazer',
    category: 'kid',
    image: '/assets/kid8.jfif',
    new_price: 105.0,
    old_price: 170.0,
    description: 'Kids casual blazer',
    inStock: true,
    stockQuantity: 20,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fashion-shop');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert products
    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products`);
    console.log('\nNote: Image paths in the database are relative paths.');
    console.log('Make sure image paths match your frontend asset structure.');
    console.log('For production, consider using a CDN or cloud storage for images.');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();

