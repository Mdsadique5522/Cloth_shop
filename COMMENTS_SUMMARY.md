# Code Comments Summary

I've added detailed comments throughout the codebase to help you understand concepts. Here's where to find them:

## Files with Comments Added

### 1. **server/index.js** - Main Server File
**Learn:** Express.js setup, middleware, MongoDB connection
- How Express server starts
- What middleware does
- How routes are organized
- Database connection process

### 2. **src/services/api.js** - API Service Layer
**Learn:** Fetch API, async/await, localStorage, JWT tokens
- How to make HTTP requests
- How tokens are stored and sent
- API request/response cycle
- Error handling

### 3. **server/routes/authRoutes.js** - Authentication Routes
**Learn:** JWT tokens, password hashing, user registration/login
- How signup works
- How login works
- How tokens are generated
- Password comparison

### 4. **server/middleware/auth.js** - Authentication Middleware
**Learn:** Middleware concept, JWT verification, protected routes
- What middleware is
- How to protect routes
- Token verification process
- Admin role checking

### 5. **src/Context/ShopContext.jsx** - React Context
**Learn:** React Context API, useState, useEffect, global state
- How Context works
- State management
- useEffect hook usage
- API integration in React

## How to Use These Comments

1. **Start with server/index.js** - Understand the server structure
2. **Read src/services/api.js** - See how frontend calls backend
3. **Study server/routes/authRoutes.js** - Learn authentication
4. **Check server/middleware/auth.js** - Understand middleware
5. **Explore src/Context/ShopContext.jsx** - Learn React state management

## Key Concepts Explained

### Middleware
Functions that run between request and response. Used for authentication, validation, etc.

### Async/Await
JavaScript way to handle operations that take time (like API calls). `await` waits for completion.

### JWT Tokens
Secure way to identify users. Created when login, sent with every request, verified by server.

### React Context
Global state management. Share data across components without passing props.

### useState
React hook to manage component state. When state changes, component re-renders.

### useEffect
React hook for side effects (API calls, subscriptions). Runs when dependencies change.

## Practice Exercises

After reading the comments, try:

1. **Add a new API endpoint** - Create a wishlist feature
2. **Add middleware** - Create rate limiting middleware
3. **Modify Context** - Add user preferences to Context
4. **Create protected route** - Add an admin dashboard route

## Questions to Test Understanding

1. What happens when a user logs in? (Follow the code flow)
2. How does the frontend send authentication token?
3. What's the difference between useState and useEffect?
4. Why do we use middleware instead of checking auth in each route?
5. How does Context prevent prop drilling?

## Next Steps

1. Read **LEARNING_GUIDE.md** for topics to study
2. Read commented code files one by one
3. Experiment by making small changes
4. Build a simple feature yourself
5. Ask questions when stuck!

Good luck! 🚀

