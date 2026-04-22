import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import planRoutes from './routes/plans.js';
import stationRoutes from './routes/stations.js';
import sessionRoutes from './routes/sessions.js';
import inventoryRoutes from './routes/inventory.js';
import billRoutes from './routes/bills.js';
import { verifyToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gaming-cafe';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('[v0] Connected to MongoDB'))
  .catch((err) => console.error('[v0] MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/plans', verifyToken, planRoutes);
app.use('/api/stations', verifyToken, stationRoutes);
app.use('/api/sessions', verifyToken, sessionRoutes);
app.use('/api/inventory', verifyToken, inventoryRoutes);
app.use('/api/bills', verifyToken, billRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[v0] Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`[v0] Backend server running on port ${PORT}`);
});
