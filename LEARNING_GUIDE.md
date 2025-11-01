# Learning Guide for This Project

## Topics You Should Learn (In Order)

### 1. **RESTful APIs** (Priority: HIGH)
**Why:** This project uses REST API design patterns
- Understanding HTTP methods (GET, POST, PUT, DELETE)
- Request/Response cycle
- API endpoints and routes
- Status codes (200, 201, 400, 401, 404, 500)

**Resources:**
- MDN: HTTP Methods
- REST API Tutorial

---

### 2. **JWT (JSON Web Tokens)** (Priority: HIGH)
**Why:** Used for user authentication
- What JWT is and how it works
- Token generation and verification
- Storing tokens in localStorage
- Token expiration

**Resources:**
- jwt.io documentation
- "JWT Authentication Explained" tutorials

---

### 3. **Password Hashing with bcrypt** (Priority: MEDIUM)
**Why:** Securely stores user passwords
- Why we hash passwords (never store plain text)
- How bcrypt works
- Hashing vs encryption

**Resources:**
- bcrypt npm documentation
- "Password Hashing Explained" articles

---

### 4. **React Context API** (Priority: HIGH)
**Why:** Used for global state management
- useContext hook
- Context Provider pattern
- Passing data without prop drilling

**Resources:**
- React official docs: Context API
- "React Context API Tutorial"

---

### 5. **React Hooks (Advanced)** (Priority: MEDIUM)
**Why:** Used extensively in this project
- useState - Managing component state
- useEffect - Side effects (API calls, subscriptions)
- useContext - Accessing context
- Custom hooks

**Resources:**
- React official docs: Hooks
- "React Hooks Complete Guide"

---

### 6. **Express Middleware** (Priority: HIGH)
**Why:** Used for authentication and request processing
- What middleware is
- Order of execution
- Custom middleware (like our auth.js)
- Error handling middleware

**Resources:**
- Express.js official docs: Using Middleware
- "Express Middleware Explained"

---

### 7. **Environment Variables (.env)** (Priority: MEDIUM)
**Why:** Stores sensitive data like database URLs and secrets
- What .env files are
- Why not commit secrets to git
- dotenv package usage

**Resources:**
- "Environment Variables Explained"
- dotenv npm documentation

---

### 8. **CORS (Cross-Origin Resource Sharing)** (Priority: MEDIUM)
**Why:** Allows frontend (localhost:5173) to call backend (localhost:5000)
- What CORS is and why it exists
- Same-origin policy
- Configuring CORS in Express

**Resources:**
- MDN: CORS
- "CORS Explained Simply"

---

### 9. **Async/Await and Promises** (Priority: HIGH)
**Why:** All API calls use async/await
- Promises in JavaScript
- Async functions
- Await keyword
- Error handling with try/catch

**Resources:**
- MDN: Async/Await
- "JavaScript Promises and Async/Await"

---

### 10. **Mongoose Advanced** (Priority: MEDIUM)
**Why:** Beyond basic CRUD operations
- Schema methods (like comparePassword)
- Middleware (pre/post hooks)
- Virtual properties
- Population (referencing other collections)

**Resources:**
- Mongoose official docs
- "Mongoose Advanced Features"

---

## Learning Path

### Week 1: Foundations
1. RESTful APIs (2-3 days)
2. Async/Await and Promises (2-3 days)
3. React Context API (2-3 days)

### Week 2: Authentication
4. JWT (2-3 days)
5. Password Hashing (1-2 days)
6. Express Middleware (2-3 days)

### Week 3: Advanced Topics
7. Environment Variables (1 day)
8. CORS (1 day)
9. Mongoose Advanced (2-3 days)

### Week 4: Practice
- Review this project code with comments
- Try modifying features
- Build a small feature yourself

---

## Quick Reference While Coding

### Common Patterns in This Project:

**1. API Service Pattern:**
```javascript
// Services make API calls
const data = await productAPI.getAll();
```

**2. Context Pattern:**
```javascript
// Get data from context
const { products, addToCart } = useContext(ShopContext);
```

**3. Protected Routes:**
```javascript
// Middleware checks authentication
router.use(authenticate); // All routes below require login
```

**4. Error Handling:**
```javascript
try {
  // Do something
} catch (error) {
  // Handle error
}
```

---

## Next Steps

1. **Start with RESTful APIs** - This is the foundation
2. **Learn JWT** - Critical for understanding auth
3. **Practice with this code** - Read the commented code
4. **Make small changes** - Try modifying existing features
5. **Build something new** - Add a feature like wishlist or reviews

---

## Recommended Practice Projects

After learning these topics:

1. **Simple Blog API** - Practice CRUD operations
2. **Todo App with Auth** - Learn JWT authentication
3. **E-commerce Cart** - Similar to this project but simpler
4. **Social Media Feed** - Practice complex data relationships

---

Good luck with your learning! 🚀

