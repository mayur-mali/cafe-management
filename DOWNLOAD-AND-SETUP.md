# Download and Setup Guide

## Project Files Available for Download

This Gaming Cafe Management System is a complete full-stack application. Here are all the key files and guides you need:

---

## Essential Documentation Files

### 1. **POSTMAN-TESTING-GUIDE.md** ⭐ START HERE
- Complete guide to import and test all API endpoints
- Step-by-step testing workflow
- Sample test data included
- Error handling solutions
- **File location**: `/POSTMAN-TESTING-GUIDE.md`

### 2. **Gaming-Cafe-API.postman_collection.json**
- Ready-to-import Postman collection
- All 40+ API endpoints with test data
- Auto-token saving configured
- Environment variables pre-configured
- **File location**: `/Gaming-Cafe-API.postman_collection.json`

### 3. **API-DOCUMENTATION.md**
- Complete API reference
- All endpoints documented
- Request/response examples
- Error codes and solutions
- **File location**: `/API-DOCUMENTATION.md`

### 4. **QUICKSTART.md**
- Quick setup instructions
- Installation steps
- Running the application
- MongoDB setup
- **File location**: `/QUICKSTART.md`

### 5. **README.md**
- Project overview
- Architecture explanation
- Features list
- Development guidelines
- **File location**: `/README.md`

---

## Project Structure

```
gaming-cafe-system/
├── frontend/                      # React + Vite Frontend
│   ├── src/
│   │   ├── pages/                # All UI pages
│   │   ├── components/           # UI components
│   │   ├── contexts/             # Auth context
│   │   ├── lib/                  # API client & utilities
│   │   └── layouts/              # Dashboard layout
│   ├── vite.config.ts           # Vite configuration
│   ├── tailwind.config.ts        # Tailwind CSS config
│   ├── package.json
│   └── .env                      # Frontend environment
│
├── backend/                       # Node.js + Express Backend
│   ├── src/
│   │   ├── models/               # MongoDB models
│   │   ├── routes/               # API endpoints
│   │   ├── middleware/           # Auth middleware
│   │   └── server.js             # Express app setup
│   ├── package.json
│   └── .env                      # Backend environment
│
├── Gaming-Cafe-API.postman_collection.json
├── POSTMAN-TESTING-GUIDE.md
├── API-DOCUMENTATION.md
├── QUICKSTART.md
├── README.md
├── pnpm-workspace.yaml
└── package.json
```

---

## How to Download and Setup

### Option 1: Download from v0 (If Working)

1. Click **three-dot menu** in top-right of v0
2. Select **"Download ZIP"**
3. Extract the ZIP file to your desired location
4. Open terminal in the extracted folder
5. Follow "Installation Steps" below

### Option 2: Clone from GitHub (Recommended)

If the project is connected to GitHub:

```bash
git clone https://github.com/YOUR-USERNAME/gaming-cafe-system.git
cd gaming-cafe-system
```

### Option 3: Manual Setup

Create the project structure manually and copy files as needed.

---

## Installation Steps

### Prerequisites
- Node.js (v18 or higher)
- pnpm (v8 or higher) - install with `npm install -g pnpm`
- MongoDB (local or MongoDB Atlas cloud)

### Step 1: Install Dependencies

```bash
cd gaming-cafe-system
pnpm install --recursive
```

This installs packages for both frontend and backend.

### Step 2: Setup Environment Variables

**Backend** - Create/update `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gaming-cafe
JWT_SECRET=your-secret-key-change-this-in-production-12345
NODE_ENV=development
```

**Frontend** - Create/update `frontend/.env`:
```
VITE_API_URL=http://localhost:5000
```

### Step 3: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod

# MongoDB will be available at: mongodb://localhost:27017
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a cluster
4. Get connection string
5. Update `MONGODB_URI` in `backend/.env`

Example:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gaming-cafe
```

### Step 4: Start the Application

**Option A: Start Both (Recommended)**
```bash
pnpm dev
```

This starts:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

**Option B: Start Separately**

Terminal 1 - Backend:
```bash
pnpm dev --workspace=backend
```

Terminal 2 - Frontend:
```bash
pnpm dev --workspace=frontend
```

---

## Testing the API

### Using Postman (Recommended)

1. **Open Postman**
2. **Import Collection**:
   - File → Import
   - Select `Gaming-Cafe-API.postman_collection.json`
   - Click Import
3. **Setup Environment**:
   - Environment → New
   - Set `BASE_URL` = `http://localhost:5000`
4. **Start Testing**:
   - Follow steps in `POSTMAN-TESTING-GUIDE.md`

### Using Frontend UI

1. Open http://localhost:5173 in browser
2. Register admin account:
   - Email: `admin@gamingcafe.com`
   - Password: `SecurePass123!@`
3. Login
4. Use the dashboard to manage plans, stations, sessions, etc.

### Using curl (Terminal)

Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Admin",
    "email": "admin@gamingcafe.com",
    "password": "SecurePass123!@",
    "phone": "9876543210"
  }'
```

Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gamingcafe.com",
    "password": "SecurePass123!@"
  }'
```

Get Plans (replace TOKEN with actual token):
```bash
curl -X GET http://localhost:5000/api/plans \
  -H "Authorization: Bearer TOKEN"
```

---

## Troubleshooting

### Issue: "Cannot find module 'express'"
**Solution**: Run `pnpm install --recursive` to install all dependencies

### Issue: "Connection refused - localhost:5000"
**Solution**: Ensure backend is running with `pnpm dev --workspace=backend`

### Issue: "MongoDB connection failed"
**Solution**:
1. Check MongoDB is running
2. Verify connection string in `backend/.env`
3. For Atlas, ensure IP whitelist includes your IP

### Issue: "PORT 5000 already in use"
**Solution**: Kill existing process or use different port in `backend/.env`

### Issue: Frontend shows blank page
**Solution**: Check browser console for errors, ensure backend is running

### Issue: "Token not saved in Postman"
**Solution**: 
1. Check login response has `token` field
2. Verify Postman test scripts are enabled
3. Manual workaround: Copy token from login response, paste in Bearer token field

---

## Running Tests

### Run All Tests
```bash
pnpm test --workspace=backend
```

### Run Specific Test
```bash
pnpm test --workspace=backend auth.test.js
```

---

## Building for Production

### Build Frontend
```bash
pnpm build --workspace=frontend
```

Output will be in `frontend/dist/`

### Build Backend
Backend doesn't need building. Just ensure `.env` is properly configured.

### Deploy

**Frontend to Vercel**:
```bash
npm i -g vercel
vercel
```

**Backend Options**:
- Render (free tier available)
- Heroku
- Railway
- AWS EC2
- DigitalOcean

---

## Key Test Data

### Admin Account
- Email: `admin@gamingcafe.com`
- Password: `SecurePass123!@`

### Sample Plans
1. 1 Hour Gaming - ₹150
2. 2 Hour Gaming - ₹250
3. All Night Gaming - ₹800

### Sample Stations
1. A-1 (Gaming PC - RTX 3080)
2. A-2 (Gaming PC - RTX 3070)
3. B-1 (Console - PS5)
4. B-2 (Console - Xbox Series X)

### Sample Inventory
1. Red Bull Energy Drink - ₹60
2. Coca Cola - ₹40
3. Chips - ₹30
4. Snacks Mix - ₹50

---

## Next Steps

1. ✅ Download the project
2. ✅ Install dependencies
3. ✅ Setup MongoDB
4. ✅ Configure `.env` files
5. ✅ Start backend and frontend
6. ✅ Import Postman collection
7. ✅ Test all endpoints
8. ✅ Explore the UI dashboard
9. ✅ Customize for your cafe

---

## Additional Resources

- **API Docs**: See `API-DOCUMENTATION.md`
- **Testing Guide**: See `POSTMAN-TESTING-GUIDE.md`
- **Quick Start**: See `QUICKSTART.md`
- **Full README**: See `README.md`

---

## Support

If you encounter issues:

1. **Check Logs**: Look at terminal output for error messages
2. **Review Docs**: Search relevant documentation file
3. **Check MongoDB**: Verify MongoDB is running and connected
4. **Verify Ports**: Ensure ports 5000, 5173 are available
5. **Environment Variables**: Verify `.env` files are correctly set

---

## License

This project is provided as-is for your Gaming Cafe management needs.

---

## File Summary

| File | Purpose | Size |
|------|---------|------|
| POSTMAN-TESTING-GUIDE.md | API Testing guide | ~500KB |
| Gaming-Cafe-API.postman_collection.json | Postman collection | ~100KB |
| API-DOCUMENTATION.md | Complete API reference | ~850KB |
| QUICKSTART.md | Quick setup guide | ~140KB |
| README.md | Project overview | ~240KB |
| backend/ | Express backend code | ~2MB |
| frontend/ | React Vite frontend | ~5MB |
| node_modules/ | Dependencies | ~500MB+ |

**Total Download Size**: ~500MB (including node_modules)

---

**Happy Cafe Managing! 🎮☕**
