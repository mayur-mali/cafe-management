# Gaming Cafe Management System

A full-stack application for managing gaming cafes with real-time session tracking, inventory management, billing, and administrative controls.

## Tech Stack

- **Frontend**: React 19 + Vite + React Router + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB + JWT Authentication
- **Database**: MongoDB (Local or Atlas)

## Project Structure

```
├── frontend/               # React + Vite frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts (Auth, etc.)
│   │   ├── layouts/        # Layout components
│   │   ├── lib/            # Utilities and API client
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   └── package.json
├── backend/                # Express.js backend application
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── server.js       # Server entry point
│   └── package.json
└── package.json            # Root monorepo configuration
```

## Features

### Admin Management
- User registration and authentication with JWT
- Role-based access control (admin, manager, staff)
- Secure password hashing with bcryptjs

### Gaming Plans
- Create and manage gaming plans with custom durations and pricing
- Flexible pricing model for different session lengths

### Station Management
- Track gaming stations/PC setups
- Monitor station status (available, occupied, maintenance)
- Assign pricing per station/hour
- Support multiple system types (Gaming PC, PS5, Xbox, VR)

### Gaming Sessions
- Start and track gaming sessions
- Pause/resume functionality
- Automatic cost calculation based on plan
- Real-time session status monitoring

### Inventory Management
- Track items (snacks, beverages, equipment, accessories)
- Monitor stock levels with reorder alerts
- Deduct inventory during billing
- Supplier management

### Billing System
- Generate detailed bills with session costs + items
- Tax and discount calculation
- Multiple payment methods (cash, card, online)
- Bill status tracking (pending, paid, cancelled)
- Daily revenue statistics

## Prerequisites

- Node.js 18+ and npm/pnpm
- MongoDB (local or MongoDB Atlas account)
- A code editor (VS Code recommended)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd gaming-cafe-system
```

### 2. Install Dependencies

Install dependencies for both frontend and backend:

```bash
pnpm install --recursive
```

### 3. Set Up Environment Variables

**Backend:**
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gaming-cafe
JWT_SECRET=your-super-secret-key-change-in-production
NODE_ENV=development
```

**Frontend:**
```bash
cp frontend/.env.example frontend/.env
```

Edit `frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB

Make sure MongoDB is running:
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud database)
# Just update the MONGODB_URI in .env
```

### 5. Start the Application

Run both frontend and backend concurrently:

```bash
pnpm dev
```

Or run them separately:

```bash
# Terminal 1: Backend
pnpm dev:backend

# Terminal 2: Frontend
pnpm dev:frontend
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin user
- `POST /api/auth/login` - Login admin user
- `GET /api/auth/me` - Get current user info

### Plans
- `GET /api/plans` - Get all plans
- `POST /api/plans` - Create new plan
- `PUT /api/plans/:id` - Update plan
- `DELETE /api/plans/:id` - Delete plan

### Stations
- `GET /api/stations` - Get all stations
- `POST /api/stations` - Create new station
- `PUT /api/stations/:id` - Update station
- `PATCH /api/stations/:id/status` - Update station status
- `DELETE /api/stations/:id` - Delete station

### Sessions
- `GET /api/sessions` - Get all sessions
- `GET /api/sessions/active` - Get active sessions
- `POST /api/sessions` - Start new session
- `POST /api/sessions/:id/end` - End session
- `POST /api/sessions/:id/pause` - Pause session
- `POST /api/sessions/:id/resume` - Resume session

### Inventory
- `GET /api/inventory` - Get all inventory items
- `GET /api/inventory/low-stock` - Get low stock items
- `POST /api/inventory` - Create inventory item
- `POST /api/inventory/:id/restock` - Restock item
- `POST /api/inventory/:id/deduct` - Deduct item quantity
- `DELETE /api/inventory/:id` - Delete item

### Bills
- `GET /api/bills` - Get all bills
- `GET /api/bills/status/:status` - Get bills by status
- `POST /api/bills` - Create new bill
- `POST /api/bills/:id/pay` - Mark bill as paid
- `POST /api/bills/:id/cancel` - Cancel bill
- `GET /api/bills/stats/daily` - Get daily revenue stats

## Default Test Credentials

After first registration, use your credentials to login:
- Username: (your chosen username)
- Password: (your chosen password)

## Development Notes

- The frontend uses Vite for fast development and build times
- API client (`lib/api.ts`) handles all backend requests with automatic token management
- Protected routes require JWT authentication
- MongoDB connection is established automatically on backend startup
- All timestamps are stored in UTC

## Troubleshooting

**Backend won't connect to MongoDB:**
- Ensure MongoDB is running (`mongod` or MongoDB Atlas connection string is correct)
- Check `MONGODB_URI` in `backend/.env`

**Frontend can't connect to backend:**
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `frontend/.env`
- Check browser console for CORS errors

**Port already in use:**
- Backend default port: 5000 (change in `.env`)
- Frontend default port: 5173 (change in `vite.config.ts`)

## Future Enhancements

- WebSocket support for real-time updates
- Advanced reporting and analytics
- Customer profiles with history
- Automated backup system
- Multi-location support
- Mobile app for customer check-ins
- Email billing and receipts

## License

This project is proprietary and confidential.

## Support

For issues or questions, please contact the development team.
