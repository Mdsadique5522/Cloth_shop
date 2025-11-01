/**
 * SHOP CONTEXT (src/Context/ShopContext.jsx)
 * 
 * WHAT IS REACT CONTEXT?
 * Context provides a way to share data across components without passing props
 * Instead of "prop drilling" (passing data through many components),
 * we put data in Context and any component can access it
 * 
 * CONCEPTS USED:
 * - React Context API: Global state management
 * - useState: Component state management
 * - useEffect: Side effects (API calls, subscriptions)
 * - useContext: Access context in components
 * 
 * HOW IT WORKS:
 * 1. Create Context with createContext()
 * 2. Provider component wraps app and provides data
 * 3. Components use useContext() to access data
 */

// Import React hooks needed for Context
import React, { createContext, useState, useEffect } from "react";

// Import API functions to fetch data from backend
import { productAPI, cartAPI, authAPI } from "../services/api";

/**
 * CREATE CONTEXT
 * This creates a "container" that will hold our global state
 * Components can "subscribe" to this context to get updates
 */
export const ShopContext = createContext(null);

/**
 * CONTEXT PROVIDER COMPONENT
 * This component wraps your entire app (in main.jsx)
 * It provides all the data and functions to child components
 * 
 * @param {object} props - React props (contains children)
 */
const ShopContextProvider = (props) => {
  /**
   * STATE VARIABLES
   * useState creates reactive state - when it changes, components re-render
   * 
   * Syntax: const [value, setValue] = useState(initialValue);
   */
  
  // Store all products from database
  const [all_product, setAllProduct] = useState([]);
  
  // Store cart items as object: { productId: quantity }
  // Example: { "123": 2, "456": 1 } means product 123 has quantity 2, product 456 has quantity 1
  const [cartItems, setCartItems] = useState({});
  
  // Loading state - true while fetching data, false when done
  const [loading, setLoading] = useState(true);
  
  // Current logged-in user (null if not logged in)
  const [user, setUser] = useState(null);
  
  // Full cart object from API (contains more details than cartItems)
  const [cart, setCart] = useState(null);

  /**
   * useEffect HOOK - Runs code when component mounts or dependencies change
   * 
   * SYNTAX: useEffect(() => { code }, [dependencies])
   * - Empty array [] = run only once when component mounts
   * - No array = run on every render (usually avoid this)
   * - [dependency] = run when dependency changes
   */

  /**
   * EFFECT 1: Load user from localStorage when app starts
   * Runs only once when component mounts (empty dependency array)
   * 
   * WHY: If user was logged in before, restore their session
   */
  useEffect(() => {
    // Get user data stored in browser's localStorage
    const storedUser = authAPI.getStoredUser();
    
    // If user exists in localStorage, set user state
    // This keeps user logged in even after page refresh
    if (storedUser) {
      setUser(storedUser);
    }
  }, []); // Empty array = run only once on mount

  /**
   * EFFECT 2: Fetch products when component mounts
   * Runs once when app loads to get all products from database
   */
  useEffect(() => {
    fetchProducts(); // Call function to get products
  }, []); // Run once on mount

  /**
   * EFFECT 3: Fetch cart when user logs in
   * Runs whenever 'user' state changes
   * 
   * WHY: When user logs in, we need to load their cart from database
   */
  useEffect(() => {
    // Only fetch cart if user is authenticated (logged in)
    if (authAPI.isAuthenticated()) {
      fetchCart();
    }
  }, [user]); // Run when 'user' changes

  /**
   * FUNCTION: Fetch Products from API
   * Gets all products from backend and stores in state
   * 
   * WHY ASYNC/AWAIT?
   * API calls take time (network request), so we use async/await
   * Without await, code continues before API responds (causes errors)
   */
  const fetchProducts = async () => {
    try {
      // Set loading to true - shows loading spinner to user
      setLoading(true);
      
      // Call API to get products
      // await waits for response before continuing
      const response = await productAPI.getAll();
      
      // Store products in state
      // response.products might be nested, or response itself might be array
      // || operator provides fallback if one is null/undefined
      setAllProduct(response.products || response || []);
    } catch (error) {
      // If API call fails (network error, server error, etc.)
      console.error("Error fetching products:", error);
      // Set empty array so app doesn't crash
      setAllProduct([]);
    } finally {
      // finally always runs (whether success or error)
      // Turn off loading spinner
      setLoading(false);
    }
  };

  /**
   * FUNCTION: Fetch Cart from API
   * Gets user's cart from backend
   * Only works if user is logged in (requires authentication)
   */
  const fetchCart = async () => {
    try {
      // Get cart data from API
      // This sends JWT token automatically (handled in api.js)
      const cartData = await cartAPI.get();
      
      // Store full cart object
      setCart(cartData);
      
      // Convert cart data to simpler format for components
      // API returns: { items: [{ product: {...}, quantity: 2 }] }
      // We convert to: { "productId": 2 } (easier to use in components)
      const cartItemsObj = {};
      if (cartData.items) {
        // Loop through each item in cart
        cartData.items.forEach((item) => {
          // Get product ID (could be _id or id depending on how API returns it)
          const productId = item.product._id || item.product;
          // Store quantity for this product
          cartItemsObj[productId] = item.quantity;
        });
      }
      // Update cartItems state with converted format
      setCartItems(cartItemsObj);
    } catch (error) {
      // If error (user not logged in, network error, etc.)
      console.error("Error fetching cart:", error);
      // Set empty cart
      setCartItems({});
    }
  };

  /**
   * FUNCTION: Add Item to Cart
   * Adds a product to user's cart
   * 
   * @param {string} itemId - Product ID to add
   */
  const addTocart = async (itemId) => {
    try {
      // Check if user is logged in
      // Can't add to cart without authentication (cart is saved in database)
      if (!authAPI.isAuthenticated()) {
        alert("Please login to add items to cart");
        return; // Stop function execution
      }
      
      // Call API to add item to cart
      // Quantity defaults to 1 if not specified
      await cartAPI.addItem(itemId, 1);
      
      // Refresh cart to get updated data from server
      await fetchCart();
    } catch (error) {
      // If error occurs, show message to user
      console.error("Error adding to cart:", error);
      alert(error.message || "Failed to add item to cart");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      if (!authAPI.isAuthenticated()) {
        // Fallback to local state if not authenticated
        setCartItems((prev) => {
          const newCart = { ...prev };
          if (newCart[itemId] > 1) {
            newCart[itemId] = newCart[itemId] - 1;
          } else {
            delete newCart[itemId];
          }
          return newCart;
        });
        return;
      }

      const currentQuantity = cartItems[itemId] || 0;
      if (currentQuantity > 1) {
        await cartAPI.updateItem(itemId, currentQuantity - 1);
      } else {
        await cartAPI.removeItem(itemId);
      }
      await fetchCart(); // Refresh cart
    } catch (error) {
      console.error("Error removing from cart:", error);
      alert(error.message || "Failed to remove item from cart");
    }
  };

  /**
   * FUNCTION: Calculate Total Cart Amount
   * Sums up price of all items in cart
   * 
   * @returns {string} Total amount formatted to 2 decimal places
   */
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    
    // Loop through each item in cart
    // cartItems is object like: { "productId1": 2, "productId2": 1 }
    for (const itemId in cartItems) {
      // Only count items with quantity > 0
      if (cartItems[itemId] > 0) {
        // Find product info from all_product array
        // Product might have _id (MongoDB) or id (numeric)
        const itemInfo = all_product.find(
          (product) => product._id === itemId || product.id === itemId
        );
        
        // If product found, calculate: price × quantity
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[itemId];
        }
      }
    }
    
    // Return formatted to 2 decimal places (e.g., "99.50")
    return totalAmount.toFixed(2);
  };

  /**
   * FUNCTION: Count Total Items in Cart
   * Counts total quantity of all items
   * 
   * @returns {number} Total quantity (e.g., if cart has 2 of item A and 3 of item B, returns 5)
   */
  const getTotalCartItems = () => {
    let totalItems = 0;
    
    // Loop through cart items and sum quantities
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item]; // Add quantity to total
      }
    }
    
    return totalItems;
  };

  /**
   * FUNCTION: Login User
   * Authenticates user and loads their cart
   * 
   * @param {string} email - User email
   * @param {string} password - User password
   */
  const login = async (email, password) => {
    try {
      // Call API to login
      // API returns token and user data
      const data = await authAPI.login(email, password);
      
      // Update user state with logged-in user
      setUser(data.user);
      
      // Load user's cart from database
      await fetchCart();
      
      // Return data so calling component can use it
      return data;
    } catch (error) {
      // Re-throw error so calling component can handle it (show error message)
      throw error;
    }
  };

  /**
   * FUNCTION: Signup New User
   * Creates account and automatically logs them in
   * 
   * @param {string} name - User name
   * @param {string} email - User email
   * @param {string} password - User password
   */
  const signup = async (name, email, password) => {
    try {
      // Call API to create account
      const data = await authAPI.signup(name, email, password);
      
      // Set user (automatically logged in after signup)
      setUser(data.user);
      
      // Create empty cart for new user
      await fetchCart();
      
      return data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * FUNCTION: Logout User
   * Clears user data and cart
   */
  const logout = () => {
    // Remove token and user from localStorage (via API function)
    authAPI.logout();
    
    // Clear all user-related state
    setUser(null);          // No user logged in
    setCartItems({});       // Empty cart
    setCart(null);          // Clear cart object
  };

  /**
   * CONTEXT VALUE OBJECT
   * This is what components get when they use useContext(ShopContext)
   * Contains all data and functions components need
   */
  const contextValue = {
    // Data
    all_product,      // All products from database
    cartItems,        // Cart items as object
    loading,          // Loading state
    user,             // Current logged-in user
    cart,             // Full cart object
    
    // Functions
    getTotalCartItems,    // Count items in cart
    getTotalCartAmount,   // Calculate total price
    addTocart,           // Add item to cart
    removeFromCart,      // Remove item from cart
    login,               // Login function
    signup,              // Signup function
    logout,              // Logout function
    fetchProducts,       // Refresh products from API
  };

  /**
   * RENDER PROVIDER
   * ShopContext.Provider wraps children and provides contextValue
   * All children can access contextValue using useContext(ShopContext)
   */
    return (
        <ShopContext.Provider value={contextValue}>
      {props.children}  {/* This is your entire app (from main.jsx) */}
        </ShopContext.Provider>
  );
};

export default ShopContextProvider;