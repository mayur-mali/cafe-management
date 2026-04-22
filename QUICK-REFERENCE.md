# Quick Reference Card - Gaming Cafe Management System

## 📌 Essential Commands

### Installation
```bash
pnpm install --recursive      # Install all dependencies
```

### Running
```bash
pnpm dev                      # Start frontend + backend
pnpm dev --workspace=backend  # Start only backend
pnpm dev --workspace=frontend # Start only frontend
```

### Building
```bash
pnpm build                    # Build frontend for production
```

---

## 🌐 URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | React UI Dashboard |
| Backend | http://localhost:5000 | API Server |
| MongoDB | mongodb://localhost:27017 | Database (local) |

---

## 🔐 Test Credentials

```
Email:    admin@gamingcafe.com
Password: SecurePass123!@
```

---

## 📌 API Base URL

```
http://localhost:5000/api
```

---

## 🧪 Quick Test Flow

1. **Register**
   ```
   POST /auth/register
   ```

2. **Login** (save token)
   ```
   POST /auth/login
   ```

3. **Create Plan**
   ```
   POST /plans
   Header: Authorization: Bearer {{TOKEN}}
   ```

4. **Create Station**
   ```
   POST /stations
   Header: Authorization: Bearer {{TOKEN}}
   ```

5. **Start Session**
   ```
   POST /sessions
   Header: Authorization: Bearer {{TOKEN}}
   ```

6. **End Session**
   ```
   PUT /sessions/:id/end
   Header: Authorization: Bearer {{TOKEN}}
   ```

7. **Create Bill**
   ```
   POST /bills
   Header: Authorization: Bearer {{TOKEN}}
   ```

---

## 📁 Key Files

| File | Purpose | Location |
|------|---------|----------|
| Postman Collection | API Testing | `/Gaming-Cafe-API.postman_collection.json` |
| Testing Guide | Step-by-step tests | `/POSTMAN-TESTING-GUIDE.md` |
| API Docs | Full API reference | `/API-DOCUMENTATION.md` |
| Setup Guide | Installation | `/DOWNLOAD-AND-SETUP.md` |
| Quick Start | 10 min setup | `/QUICKSTART.md` |

---

## 🗄️ Database Models

```
Admin      → Stores admin accounts
Plan       → Gaming plans (1hr, 2hr, etc)
Station    → Gaming stations (PCs, Consoles)
Session    → Active/past gaming sessions
Inventory  → Items like drinks, snacks
Bill       → Customer invoices
```

---

## 🔗 API Endpoint Groups

### Auth (2 endpoints)
```
POST   /api/auth/register
POST   /api/auth/login
```

### Plans (5 endpoints)
```
POST   /api/plans
GET    /api/plans
GET    /api/plans/:id
PUT    /api/plans/:id
DELETE /api/plans/:id
```

### Stations (5 endpoints)
```
POST   /api/stations
GET    /api/stations
GET    /api/stations/:id
PUT    /api/stations/:id
DELETE /api/stations/:id
```

### Sessions (6 endpoints)
```
POST   /api/sessions
GET    /api/sessions
GET    /api/sessions/active
PUT    /api/sessions/:id/pause
PUT    /api/sessions/:id/resume
PUT    /api/sessions/:id/end
```

### Inventory (6 endpoints)
```
POST   /api/inventory
GET    /api/inventory
GET    /api/inventory/low-stock
PUT    /api/inventory/:id
PUT    /api/inventory/:id/reduce
DELETE /api/inventory/:id
```

### Bills (6 endpoints)
```
POST   /api/bills
GET    /api/bills
GET    /api/bills/:id
GET    /api/bills/revenue/daily
GET    /api/bills/revenue
PUT    /api/bills/:id/paid
```

---

## ⚙️ Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gaming-cafe
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

---

## 🧪 Postman Setup

1. **Import Collection**
   - File → Import
   - Select `Gaming-Cafe-API.postman_collection.json`

2. **Set Environment**
   - BASE_URL = `http://localhost:5000`

3. **Test Flow**
   - Register → Login → Create Plans → Create Stations
   - Start Session → End Session → Create Bill

---

## 📊 Request/Response Headers

### Required Header for Protected Routes
```
Authorization: Bearer {{TOKEN}}
Content-Type: application/json
```

### Response Codes
```
200 - Success
201 - Created
400 - Bad Request
401 - Unauthorized (need token)
404 - Not Found
500 - Server Error
```

---

## 🔥 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Port 5000 in use | Change PORT in backend/.env |
| MongoDB failed | Ensure mongod is running |
| Token invalid | Re-login and get new token |
| 404 on frontend | Ensure backend is running |
| Dependencies missing | Run `pnpm install --recursive` |

---

## 📋 Setup Checklist

- [ ] Node.js 18+ installed
- [ ] pnpm installed
- [ ] MongoDB running
- [ ] `.env` files configured
- [ ] Dependencies installed
- [ ] Backend starts on 5000
- [ ] Frontend starts on 5173
- [ ] Postman collection imported
- [ ] Can login with test credentials
- [ ] All endpoints working

---

## 🎯 Typical Daily Workflow

```
Morning
├─ Check active sessions
├─ Monitor station status
└─ Review inventory levels

Afternoon
├─ Create new sessions
├─ Pause/resume sessions
└─ Track revenue

Evening
├─ End sessions
├─ Generate bills
├─ Process payments
└─ View daily report
```

---

## 📞 Help

| Need | File |
|------|------|
| Setup help | DOWNLOAD-AND-SETUP.md |
| Testing help | POSTMAN-TESTING-GUIDE.md |
| API details | API-DOCUMENTATION.md |
| Quick start | QUICKSTART.md |
| Full info | README.md |

---

## 🚀 One-Line Startup

```bash
# Navigate to project, install, setup env, start
pnpm install --recursive && pnpm dev
```

---

## 💾 Sample Data

### Plan
```json
{
  "name": "1 Hour Gaming",
  "duration": 60,
  "price": 150,
  "description": "1 hour of gaming"
}
```

### Station
```json
{
  "stationNumber": "A-1",
  "type": "Gaming PC",
  "specs": "RTX 3080, i9-12900K, 32GB RAM",
  "status": "available",
  "hourlyRate": 200
}
```

### Session
```json
{
  "stationId": "{{STATION_ID}}",
  "planId": "{{PLAN_ID}}",
  "customerName": "Raj Kumar",
  "customerPhone": "9876543210"
}
```

### Bill
```json
{
  "sessionId": "{{SESSION_ID}}",
  "items": [{"description": "Gaming", "amount": 150}],
  "totalAmount": 150,
  "taxPercent": 5,
  "discountPercent": 0,
  "paymentMethod": "cash"
}
```

---

## 🔄 Data Flow

```
User Login
    ↓ (Get TOKEN)
Create Plan & Station
    ↓
Customer Starts Session
    ↓
Session Runs (Pause/Resume as needed)
    ↓
Session Ends
    ↓
Create Bill
    ↓
Mark as Paid
    ↓
View Revenue Report
```

---

## 📈 Key Metrics Available

- Daily Revenue
- Total Sessions
- Active Sessions
- Station Utilization
- Inventory Levels
- Bill Statistics
- Payment Methods

---

## 🎨 Tech Stack Quick View

```
Frontend:  React 18 + Vite + Tailwind CSS
Backend:   Node.js + Express + MongoDB
Auth:      JWT (JSON Web Tokens)
Testing:   Postman + curl
```

---

## ⏱️ Typical Response Times

- Login: ~50ms
- Get Plans: ~20ms
- Start Session: ~100ms
- Create Bill: ~150ms
- Get Revenue: ~100ms

---

## 📱 Responsive Design

- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (< 768px)

---

## 🔐 Security

- JWT Token Authentication
- Password Hashing (bcryptjs)
- Protected API Routes
- CORS Enabled
- Input Validation

---

**Last Updated**: January 2024 | **Version**: 1.0.0

Keep this card handy while developing! 📌
