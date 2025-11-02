/**
 * AUTHENTICATION MIDDLEWARE (server/middleware/auth.js)
 * 
 * WHAT IS MIDDLEWARE?
 * Middleware functions run between receiving a request and sending a response
 * They can modify the request, check authentication, validate data, etc.
 * 
 * CONCEPTS USED:
 * - Express Middleware: Functions with (req, res, next) signature
 * - JWT Verification: Checking if token is valid
 * - next() function: Passes control to next middleware/route handler
 */

// Import jsonwebtoken to verify JWT tokens
import jwt from 'jsonwebtoken';

// Import User model to fetch user data
import User from '../models/User.js';

/**
 * AUTHENTICATION MIDDLEWARE
 * This function protects routes - only authenticated users can access them
 * 
 * HOW IT WORKS:
 * 1. Extract token from request headers
 * 2. Verify token is valid (not expired, not tampered with)
 * 3. Find user in database using ID from token
 * 4. Attach user to request object
 * 5. Call next() to continue to route handler
 * 
 * USAGE:
 * router.get('/protected-route', authenticate, (req, res) => {
 *   // This code only runs if user is authenticated
 *   // req.user contains the authenticated user
 * });
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Call next middleware/route handler
 */
export const authenticate = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    // Frontend sends: "Authorization: Bearer eyJhbGc..."
    // We need to split by space and get the second part (the token itself)
    // Optional chaining (?.) prevents error if authorization header doesn't exist
    const token = req.headers.authorization?.split(' ')[1];

    // If no token provided, return error
    // Status 401 = Unauthorized
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify token using the same secret key used to create it
    // jwt.verify() throws an error if token is invalid or expired
    // If valid, it returns the decoded data (we stored { userId } in it)
    // Use same default secret as generateToken for consistency
    const jwtSecret = process.env.JWT_SECRET || 'default-jwt-secret-for-development-change-in-production';
    const decoded = jwt.verify(token, jwtSecret);
    
    // Find user in database using ID from token
    // decoded.userId was stored when we created the token
    const user = await User.findById(decoded.userId);

    // If user not found (maybe deleted after token was issued)
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user object to request
    // Now any route handler after this middleware can access req.user
    req.user = user;
    
    // Call next() to continue to the next middleware or route handler
    // Without next(), the request would hang - nothing would respond
    next();
  } catch (error) {
    // If token verification fails (expired, invalid, etc.)
    // Return error response
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/**
 * ADMIN CHECK MIDDLEWARE
 * Checks if authenticated user has admin role
 * Must be used AFTER authenticate middleware
 * 
 * USAGE:
 * router.delete('/admin-only', authenticate, isAdmin, (req, res) => {
 *   // Only admins can reach this code
 * });
 * 
 * @param {object} req - Express request object (should have req.user from authenticate)
 * @param {object} res - Express response object
 * @param {function} next - Call next middleware/route handler
 */
export const isAdmin = (req, res, next) => {
  // Check if user exists and has admin role
  // req.user was set by authenticate middleware
  if (req.user && req.user.role === 'admin') {
    // User is admin, allow access
    next();
  } else {
    // User is not admin, deny access
    // Status 403 = Forbidden (not authorized for this action)
    res.status(403).json({ message: 'Admin access required' });
  }
};

