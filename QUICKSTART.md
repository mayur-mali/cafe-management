# Gaming Cafe Management System - Quick Start Guide

## 🚀 Fast Setup (5 minutes)

### 1. Install Dependencies
```bash
pnpm install --recursive
```

### 2. Set Up Environment Variables

**Backend** - Create `backend/.env`:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gaming-cafe
JWT_SECRET=your-super-secret-key-here
NODE_ENV=development
```

**Frontend** - Create `frontend/.env`:
```bash
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB

# Or use MongoDB Atlas (cloud) - just update MONGODB_URI in backend/.env
```

### 4. Start the Application
```bash
pnpm dev
```

This will start both the backend (port 5000) and frontend (port 5173) concurrently.

## 📱 Application Access

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **API Docs**: Available via Postman/REST clients at http://localhost:5000/api/*

## 🔑 Initial Setup

1. Go to http://localhost:5173/register
2. Create your admin account with a username, email, and password
3. Use those credentials to login
4. Start managing your gaming cafe!

## 📁 Key Project Folders

```
frontend/
├── src/
│   ├── components/ui/      # Reusable UI components
│   ├── pages/              # Page components
│   ├── contexts/           # React contexts (Auth)
│   ├── layouts/            # Layout components
│   ├── lib/                # API client & utilities
│   └── App.tsx             # Main app

backend/
├── src/
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth middleware
│   └── server.js           # Entry point
```

## 💡 Common Commands

```bash
# Development
pnpm dev                 # Start both frontend & backend
pnpm dev:frontend        # Start frontend only
pnpm dev:backend         # Start backend only

# Production Build
pnpm build              # Build frontend and backend

# Stop the dev server
# Ctrl + C in the terminal
```

## 🆘 Troubleshooting

**MongoDB Connection Error?**
- Ensure MongoDB is running: `mongo --version` should work
- Check `MONGODB_URI` in `backend/.env`
- Try using MongoDB Atlas cloud: https://www.mongodb.com/cloud/atlas

**Frontend shows "Failed to fetch from server"?**
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `frontend/.env`
- Open browser DevTools (F12) Console for detailed errors

**Port already in use?**
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change port in `frontend/vite.config.ts` server.port

## 📚 Next Steps

After getting the app running:

1. **Create Gaming Plans** - Navigate to Plans section
2. **Add Gaming Stations** - Add your gaming PC/console setups
3. **Manage Inventory** - Stock snacks and beverages
4. **Start Sessions** - Begin gaming sessions for customers
5. **Generate Bills** - Create and manage billing

## 🔐 Security Note

⚠️ **For Production:**
- Change `JWT_SECRET` in `backend/.env` to a strong random string
- Use MongoDB Atlas with authentication
- Enable HTTPS
- Set up proper CORS in backend
- Use environment variables securely

## 📖 Full Documentation

See `README.md` for complete documentation including:
- Detailed API endpoints
- Database schema
- Feature descriptions
- Development notes

---

**Need help?** Check the README.md file or examine the API routes in `backend/src/routes/`
