# Quick Setup Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Environment Variables

Copy `env.example` to `.env`:

```bash
# Windows
copy env.example .env

# macOS/Linux
cp env.example .env
```

Edit `.env` and set your MongoDB connection string:

```env
MONGO_URI=mongodb://localhost:27017/fashion-shop
JWT_SECRET=your-secret-key-here
```

## 3. Start MongoDB

**Local MongoDB:**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**OR use MongoDB Atlas (Cloud):**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGO_URI` in `.env`

## 4. Seed Database (Optional)

Populate with sample products:

```bash
npm run seed
```

## 5. Start Development Servers

**Option 1: Run both together**
```bash
npm run dev:all
```

**Option 2: Run separately**

Terminal 1 (Backend):
```bash
npm run dev:server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

## 6. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env` file
- For Atlas: Whitelist your IP address

### Port Already in Use
- Change `PORT` in `.env` file
- Or stop the process using the port

### Module Not Found Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Next Steps

1. Create an account at `/login`
2. Browse products and add to cart
3. Check out the API endpoints in README.md

