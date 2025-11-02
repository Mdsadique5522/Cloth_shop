/**
 * SERVER ENTRY POINT (server/index.js)
 * This is the main file that starts our Express.js server
 * 
 * CONCEPTS USED:
 * - Express.js: Web framework for Node.js
 * - MongoDB/Mongoose: Database connection
 * - Middleware: Functions that run between request and response
 * - Environment Variables: Secure configuration
 */

// Import Express.js - web framework for building APIs
import express from 'express';

// Import Mongoose - MongoDB object modeling tool (easier database operations)
import mongoose from 'mongoose';

// Import CORS - allows frontend (localhost:5173) to call backend (localhost:5000)
import cors from 'cors';

// Import dotenv - loads environment variables from .env file
import dotenv from 'dotenv';

// Import route files - these contain our API endpoints
// Routes organize our code by feature (products, auth, cart, orders)
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load environment variables from .env file
// This gives us access to PORT, MONGO_URI, JWT_SECRET, etc.
dotenv.config();

// Check if JWT_SECRET is configured, warn if using default
if (!process.env.JWT_SECRET) {
  console.warn('⚠️  WARNING: JWT_SECRET not found in .env file. Using default secret for development.');
  console.warn('⚠️  For production, create a .env file with: JWT_SECRET=your-strong-random-secret-key');
}

// Create Express application instance
// This is our server - it handles HTTP requests and responses
const app = express();

/**
 * MIDDLEWARE - Functions that run before routes
 * Middleware processes requests before they reach route handlers
 * Order matters! They execute top to bottom
 */

// CORS middleware - allows frontend to make requests to this backend
// Without this, browser blocks requests due to "same-origin policy"
app.use(cors());

// JSON parser middleware - converts JSON request body to JavaScript object
// Example: { "name": "John" } → req.body.name = "John"
app.use(express.json());

// URL-encoded parser - handles form data
// Example: name=John&email=john@example.com → req.body = { name: "John", email: "john@example.com" }
app.use(express.urlencoded({ extended: true }));

/**
 * ROUTES - API endpoints
 * These map URLs to functions that handle requests
 * 
 * Example: GET /api/products → productRoutes handles it
 * All routes starting with /api/products go to productRoutes
 */
app.use('/api/products', productRoutes);  // Product CRUD operations
app.use('/api/auth', authRoutes);          // Login, signup, profile
app.use('/api/cart', cartRoutes);          // Shopping cart operations
app.use('/api/orders', orderRoutes);       // Order creation and management

/**
 * HEALTH CHECK ROUTE
 * Simple endpoint to verify server is running
 * Useful for monitoring and testing
 * image.png
 * GET /api/health returns: { status: 'OK', message: 'Server is running' }
 */
app.get('/api/health', (req, res) => {
  // req = request object (incoming data)
  // res = response object (outgoing data)
  res.json({ status: 'OK', message: 'Server is running' });
});

/**
 * MONGODB CONNECTION
 * Connects to MongoDB database before starting server
 * Uses async/await pattern (.then() is same as await)
 */
const PORT = process.env.PORT || 5000;  // Use PORT from .env, or default to 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fashion-shop';

// Connect to MongoDB database
mongoose
  .connect(MONGO_URI)
  .then(() => {
    // If connection succeeds, log success and start server
    console.log('Connected to MongoDB');
    
    // Start listening for HTTP requests on specified port
    // Once this runs, server is live and accepting requests
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    // If connection fails, log error and exit program
    // process.exit(1) stops the Node.js process
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Export app so it can be imported elsewhere (for testing)
export default app;

