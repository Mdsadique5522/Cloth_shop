/**
 * API SERVICE LAYER (src/services/api.js)
 * This file centralizes all API calls to the backend
 * 
 * CONCEPTS USED:
 * - Fetch API: JavaScript's way to make HTTP requests
 * - Async/Await: Handle asynchronous operations (API calls)
 * - localStorage: Store data in browser (tokens, user info)
 * - JWT Tokens: Authentication tokens sent with requests
 */

// Get API base URL from environment variable or use default
// import.meta.env is Vite's way to access environment variables
// If VITE_API_URL exists, use it; otherwise use localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * HELPER FUNCTION: Get Authentication Token
 * Retrieves JWT token from browser's localStorage
 * localStorage persists data even after browser closes
 * 
 * @returns {string|null} JWT token or null if not found
 */
const getAuthToken = () => {
  // localStorage.getItem reads data stored with localStorage.setItem
  // We stored token when user logged in
  return localStorage.getItem('token');
};

/**
 * HELPER FUNCTION: Make API Request
 * Centralized function that handles ALL API calls
 * Adds authentication token automatically if user is logged in
 * 
 * @param {string} endpoint - API endpoint (e.g., '/products', '/auth/login')
 * @param {object} options - Request options (method, body, headers, etc.)
 * @returns {Promise} Response data from server
 */
const apiRequest = async (endpoint, options = {}) => {
  // Get token if user is logged in
  const token = getAuthToken();
  
  // Build request configuration object
  // Spread operator (...) copies existing options and adds/overrides with new ones
  const config = {
    ...options,  // Copy method, body, etc. from options
    headers: {
      'Content-Type': 'application/json',  // Tell server we're sending JSON
      // Add Authorization header ONLY if token exists
      // Conditional: token && { Authorization: ... } means "if token exists, add Authorization"
      ...(token && { Authorization: `Bearer ${token}` }),
      // Override with any custom headers passed in options
      ...options.headers,
    },
  };

  // Try to make the API request
  try {
    // fetch() is JavaScript's built-in function for HTTP requests
    // It returns a Promise (async operation)
    // await waits for the Promise to complete before continuing
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Parse JSON response body to JavaScript object
    // response.json() also returns a Promise, so we await it
    const data = await response.json();

    // Check if request was successful (status 200-299)
    // response.ok is true for status codes 200-299
    if (!response.ok) {
      // If not successful, throw error with message from server
      throw new Error(data.message || 'An error occurred');
    }

    // If successful, return the data
    return data;
  } catch (error) {
    // If anything goes wrong (network error, JSON parse error, etc.)
    console.error('API Error:', error);
    // Re-throw error so calling function can handle it
    throw error;
  }
};

/**
 * PRODUCT API FUNCTIONS
 * These functions make HTTP requests to product endpoints
 * GET = retrieve data, POST = create, PUT = update, DELETE = remove
 */
export const productAPI = {
  /**
   * Get all products (with optional filters)
   * @param {object} params - Query parameters (category, search, page, limit)
   * @returns {Promise} Array of products
   * 
   * Example: productAPI.getAll({ category: 'men', page: 1 })
   */
  getAll: (params = {}) => {
    // Convert object to query string: { category: 'men' } → "category=men"
    // URLSearchParams converts object to URL-friendly string
    const queryString = new URLSearchParams(params).toString();
    // Build full URL: "/products?category=men" or just "/products" if no params
    return apiRequest(`/products${queryString ? `?${queryString}` : ''}`);
  },
  
  // Get single product by ID
  // Example: productAPI.getById('123456')
  getById: (id) => apiRequest(`/products/${id}`),
  
  // Get products by category
  // Example: productAPI.getByCategory('women')
  getByCategory: (category) => apiRequest(`/products?category=${category}`),
  
  // Search products by name
  // encodeURIComponent ensures special characters are URL-safe
  // Example: productAPI.search('jeans')
  search: (searchTerm) => apiRequest(`/products?search=${encodeURIComponent(searchTerm)}`),
};

/**
 * AUTHENTICATION API FUNCTIONS
 * Handles user login, signup, and authentication
 */
export const authAPI = {
  /**
   * Create new user account
   * @param {string} name - User's name
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise} User data and JWT token
   */
  signup: async (name, email, password) => {
    // Make POST request to /auth/signup
    // JSON.stringify converts JavaScript object to JSON string (required for fetch)
    const data = await apiRequest('/auth/signup', {
      method: 'POST',  // HTTP method: POST creates new resource
      body: JSON.stringify({ name, email, password }),
    });
    
    // If server returned a token (user was created successfully)
    if (data.token) {
      // Store token in localStorage so we can use it for future requests
      // localStorage only stores strings, so objects must be stringified
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },
  
  /**
   * Login existing user
   * Similar to signup, but for existing users
   */
  login: async (email, password) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Store token and user info for authenticated requests
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },
  
  /**
   * Logout user
   * Removes token and user data from localStorage
   */
  logout: () => {
    localStorage.removeItem('token');  // Remove token
    localStorage.removeItem('user');   // Remove user data
  },
  
  /**
   * Get current logged-in user from server
   * Requires authentication (sends token automatically)
   */
  getCurrentUser: () => apiRequest('/auth/me'),
  
  /**
   * Update user profile
   * @param {object} profileData - Updated profile information
   */
  updateProfile: (profileData) =>
    apiRequest('/auth/profile', {
      method: 'PUT',  // PUT is used for updating existing resources
      body: JSON.stringify(profileData),
    }),
  
  /**
   * Check if user is authenticated
   * @returns {boolean} True if token exists
   * !! converts value to boolean (!!null = false, !!'token' = true)
   */
  isAuthenticated: () => !!localStorage.getItem('token'),
  
  /**
   * Get user data from localStorage
   * @returns {object|null} User object or null if not found
   */
  getStoredUser: () => {
    // Get user string from localStorage
    const userStr = localStorage.getItem('user');
    // If exists, parse JSON string back to object, otherwise return null
    // JSON.parse converts JSON string to JavaScript object
    return userStr ? JSON.parse(userStr) : null;
  },
};

/**
 * CART API FUNCTIONS
 * Manages user's shopping cart
 */
export const cartAPI = {
  // Get user's cart (requires authentication)
  get: () => apiRequest('/cart'),
  
  // Add item to cart
  // @param {string} productId - Product to add
  // @param {number} quantity - How many to add (default: 1)
  addItem: (productId, quantity = 1) =>
    apiRequest('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    }),
  
  // Update item quantity in cart
  updateItem: (productId, quantity) =>
    apiRequest('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
    }),
  
  // Remove item from cart
  removeItem: (productId) =>
    apiRequest(`/cart/remove/${productId}`, {
      method: 'DELETE',  // DELETE removes a resource
    }),
  
  // Clear entire cart
  clear: () =>
    apiRequest('/cart/clear', {
      method: 'DELETE',
    }),
};

/**
 * ORDER API FUNCTIONS
 * Handles order creation and retrieval
 */
export const orderAPI = {
  // Get all user's orders
  getAll: () => apiRequest('/orders'),
  
  // Get single order by ID
  getById: (id) => apiRequest(`/orders/${id}`),
  
  // Create new order from cart
  // @param {object} orderData - Order details (shipping address, payment method, etc.)
  create: (orderData) =>
    apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
};

export default {
  productAPI,
  authAPI,
  cartAPI,
  orderAPI,
};

