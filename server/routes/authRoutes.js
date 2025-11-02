/**
 * AUTHENTICATION ROUTES (server/routes/authRoutes.js)
 * Handles user registration, login, and profile management
 * 
 * CONCEPTS USED:
 * - Express Router: Groups related routes together
 * - JWT (JSON Web Tokens): Secure way to identify users
 * - bcrypt: Password hashing (handled in User model)
 * - Middleware: authenticate function protects routes
 * - Async/Await: Handle database operations
 */

// Import Express Router to create route handlers
import express from 'express';

// Import jsonwebtoken library for creating/verifying JWT tokens
import jwt from 'jsonwebtoken';

// Import User model to interact with users collection in MongoDB
import User from '../models/User.js';

// Import authentication middleware to protect routes
import { authenticate } from '../middleware/auth.js';

// Create Express router instance
// Router lets us group related routes and export them
const router = express.Router();

/**
 * HELPER FUNCTION: Generate JWT Token
 * Creates a secure token that identifies a user
 * Token is signed with a secret key so it can't be tampered with
 * 
 * @param {string} userId - MongoDB user ID
 * @returns {string} JWT token
 * 
 * HOW JWT WORKS:
 * 1. Server creates token with user ID and secret
 * 2. Client stores token in localStorage
 * 3. Client sends token with every request
 * 4. Server verifies token to identify user
 */
const generateToken = (userId) => {
  // Use JWT_SECRET from .env file, or a default secret for development
  // WARNING: In production, always set JWT_SECRET in .env file for security!
  const jwtSecret = process.env.JWT_SECRET || 'default-jwt-secret-for-development-change-in-production';
  
  // jwt.sign() creates a token
  // First param: data to encode (userId)
  // Second param: secret key (from .env file or default)
  // Third param: options (expires in 7 days)
  return jwt.sign({ userId }, jwtSecret, {
    expiresIn: '7d',  // Token expires after 7 days
  });
};

/**
 * ROUTE: POST /api/auth/signup
 * Creates a new user account
 * 
 * REQUEST BODY:
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 * 
 * RESPONSE (success):
 * {
 *   "message": "User created successfully",
 *   "token": "eyJhbGc...",
 *   "user": { "id": "...", "name": "...", "email": "..." }
 * }
 */
router.post('/signup', async (req, res) => {
  // Try-catch handles errors gracefully
  try {
    // Destructure request body - extract name, email, password
    // req.body contains data sent from frontend
    const { name, email, password } = req.body;

    // Validate that all required fields are provided
    // If any missing, return error response (400 = Bad Request)
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Normalize email: convert to lowercase and remove spaces
    // This ensures "John@Email.com" and "john@email.com" are treated the same
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if user with this email already exists in database
    // User.findOne() returns the user document or null
    // await waits for database query to complete
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      // If user exists, return error (400 = Bad Request)
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new User instance with provided data
    // This doesn't save to database yet - just creates object in memory
    const user = new User({ name, email: normalizedEmail, password });
    
    // Save user to database
    // User model's pre('save') hook automatically hashes the password before saving
    await user.save();

    // Generate JWT token for the new user
    // Token contains user ID so we know who this is in future requests
    const token = generateToken(user._id);

    // Send success response
    // Status 201 = Created (new resource was created)
    // Include token so frontend can store it
    // Include user info (but NOT password - User model removes it automatically)
    res.status(201).json({
      message: 'User created successfully',
      token,  // JWT token
      user: {
        id: user._id,        // MongoDB document ID
        name: user.name,
        email: user.email,
        role: user.role,     // 'user' or 'admin'
      },
    });
  } catch (error) {
    // If anything goes wrong (database error, validation error, etc.)
    // Return error response (400 = Bad Request)
    res.status(400).json({ message: error.message });
  }
});

/**
 * ROUTE: POST /api/auth/login
 * Authenticates existing user and returns token
 * 
 * REQUEST BODY:
 * {
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 */
router.post('/login', async (req, res) => {
  try {
    // Extract email and password from request
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Normalize email (same as signup)
    const normalizedEmail = email.toLowerCase().trim();
    
    // Find user in database by email
    const user = await User.findOne({ email: normalizedEmail });
    
    // If user doesn't exist, return error
    // Status 401 = Unauthorized (invalid credentials)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare provided password with hashed password in database
    // comparePassword() is a method defined in User model
    // It uses bcrypt to securely compare passwords
    // This returns true if passwords match, false otherwise
    const isPasswordValid = await user.comparePassword(password);
    
    // If password doesn't match, return error
    // We use same message for both "user not found" and "wrong password"
    // This prevents attackers from knowing if email exists
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If we reach here, login is successful
    // Generate token for authenticated user
    const token = generateToken(user._id);

    // Return success response with token
    // Status 200 = OK (default, so we don't need to specify)
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // If server error occurs (500 = Internal Server Error)
    res.status(500).json({ message: error.message });
  }
});

/**
 * ROUTE: GET /api/auth/me
 * Gets current logged-in user's information
 * 
 * PROTECTED ROUTE: Requires authentication
 * The 'authenticate' middleware runs BEFORE this function
 * It verifies the JWT token and attaches user to req.user
 * 
 * REQUEST HEADERS:
 * Authorization: "Bearer eyJhbGc..."
 */
router.get('/me', authenticate, async (req, res) => {
  try {
    // authenticate middleware already found the user and attached it to req.user
    // So we just return it
    // This route is protected - only logged-in users can access it
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const allowedUpdates = ['name', 'phone', 'address'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.json(req.user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;

