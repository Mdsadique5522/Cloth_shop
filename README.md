# Fashion Shop - Full-Stack E-Commerce Application

A modern, scalable full-stack e-commerce application built with React, Node.js, Express.js, and MongoDB.

## Features

- 🛍️ **Product Management**: Browse products by category (Men, Women, Kids)
- 🔐 **User Authentication**: Secure JWT-based authentication system
- 🛒 **Shopping Cart**: Persistent cart functionality for authenticated users
- 📦 **Order Management**: Complete order processing system
- 🎨 **Modern UI**: Clean and responsive user interface
- 🔒 **Secure Backend**: RESTful API with proper authentication middleware

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Vite
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Fashion-shop-main
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/fashion-shop
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CLIENT_URL=http://localhost:5173
```

**For MongoDB Atlas (cloud database):**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fashion-shop
```

### 4. Start MongoDB

If using local MongoDB:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

Or use MongoDB Atlas cloud database (no local installation needed).

### 5. Seed the Database (Optional)

Populate the database with sample products:

```bash
npm run seed
```

### 6. Start the Application

#### Option A: Run frontend and backend separately

**Terminal 1 - Start backend:**
```bash
npm run dev:server
```

**Terminal 2 - Start frontend:**
```bash
npm run dev
```

#### Option B: Run both concurrently

```bash
npm run dev:all
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Project Structure

```
Fashion-shop-main/
├── server/                 # Backend code
│   ├── index.js           # Express server entry point
│   ├── models/            # Mongoose models
│   │   ├── Product.js
│   │   ├── User.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/            # API routes
│   │   ├── productRoutes.js
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/        # Custom middleware
│   │   └── auth.js
│   └── scripts/           # Utility scripts
│       └── seedProducts.js
├── src/                   # Frontend code
│   ├── Components/        # React components
│   ├── Pages/            # Page components
│   ├── Context/          # React Context
│   ├── services/         # API service layer
│   └── assets/           # Static assets
├── package.json
└── README.md
```

## API Endpoints

### Products
- `GET /api/products` - Get all products (supports query params: category, search, limit, page)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Cart
- `GET /api/cart` - Get user's cart (requires auth)
- `POST /api/cart/add` - Add item to cart (requires auth)
- `PUT /api/cart/update` - Update cart item quantity (requires auth)
- `DELETE /api/cart/remove/:productId` - Remove item from cart (requires auth)
- `DELETE /api/cart/clear` - Clear cart (requires auth)

### Orders
- `GET /api/orders` - Get user's orders (requires auth)
- `GET /api/orders/:id` - Get single order (requires auth)
- `POST /api/orders` - Create order from cart (requires auth)

## Usage

### Creating an Account
1. Navigate to `/login`
2. Click "Sign up here" or "Login here" to toggle between signup and login
3. Fill in your details and submit

### Shopping
1. Browse products on the home page or by category
2. Click on a product to view details
3. Add products to cart (login required)
4. View cart and proceed to checkout

### Development

#### Backend Development
```bash
npm run dev:server    # Start server with nodemon (auto-reload)
npm run server        # Start server normally
```

#### Frontend Development
```bash
npm run dev           # Start Vite dev server
npm run build         # Build for production
npm run preview       # Preview production build
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | 5000 |
| `MONGO_URI` | MongoDB connection string | mongodb://localhost:27017/fashion-shop |
| `JWT_SECRET` | Secret key for JWT tokens | - |
| `CLIENT_URL` | Frontend URL (for CORS) | http://localhost:5173 |

## Important Notes

1. **Image Paths**: Product images are currently referenced from the frontend assets folder. In production, consider using a cloud storage service (AWS S3, Cloudinary, etc.) and storing image URLs in the database.

2. **JWT Secret**: Change the JWT_SECRET in production to a strong, random string.

3. **MongoDB**: Ensure MongoDB is running before starting the backend server.

4. **CORS**: The backend is configured to accept requests from `http://localhost:5173`. Update the CORS configuration if deploying to production.

## Production Deployment

### Frontend
1. Build the React app: `npm run build`
2. Deploy the `dist` folder to a hosting service (Vercel, Netlify, etc.)
3. Update `CLIENT_URL` in backend `.env`

### Backend
1. Set up production environment variables
2. Use a process manager like PM2: `pm2 start server/index.js`
3. Deploy to a service like Heroku, Railway, or AWS

### Database
- Use MongoDB Atlas for production database
- Update `MONGO_URI` in production `.env`

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running (local) or check Atlas connection string
- Verify `MONGO_URI` in `.env` file

### CORS Errors
- Check that `CLIENT_URL` matches your frontend URL
- Verify backend is running on correct port

### Authentication Issues
- Clear browser localStorage and try logging in again
- Check JWT_SECRET is set in `.env`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.

