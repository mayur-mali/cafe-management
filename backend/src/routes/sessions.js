import express from 'express';
import Session from '../models/Session.js';
import Station from '../models/Station.js';
import Plan from '../models/Plan.js';

const router = express.Router();

// Get all sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate('stationId', 'name stationNumber')
      .populate('planId', 'name duration price')
      .sort({ createdAt: -1 });
    res.json(sessions);
  } catch (error) {
    console.error('[v0] Get sessions error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get active sessions
router.get('/active', async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'active' })
      .populate('stationId', 'name stationNumber')
      .populate('planId', 'name duration price')
      .sort({ startTime: 1 });
    res.json(sessions);
  } catch (error) {
    console.error('[v0] Get active sessions error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get session by ID
router.get('/:id', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate('stationId')
      .populate('planId');
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json(session);
  } catch (error) {
    console.error('[v0] Get session error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create session
router.post('/', async (req, res) => {
  try {
    const { stationId, customerName, phoneNumber, planId } = req.body;

    if (!stationId || !customerName || !planId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if station exists and is available
    const station = await Station.findById(stationId);
    if (!station || !station.isActive) {
      return res.status(404).json({ error: 'Station not found or inactive' });
    }

    // Check if plan exists
    const plan = await Plan.findById(planId);
    if (!plan || !plan.isActive) {
      return res.status(404).json({ error: 'Plan not found or inactive' });
    }

    const session = new Session({
      stationId,
      customerName,
      phoneNumber,
      planId,
      startTime: new Date(),
      cost: plan.price,
    });

    await session.save();

    // Update station status to occupied
    await Station.findByIdAndUpdate(stationId, { status: 'occupied' });

    res.status(201).json(session);
  } catch (error) {
    console.error('[v0] Create session error:', error);
    res.status(500).json({ error: error.message });
  }
});

// End session
router.post('/:id/end', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ error: 'Session not found' });

    const endTime = new Date();
    const duration = Math.ceil((endTime - session.startTime) / (1000 * 60)); // in minutes

    const plan = await Plan.findById(session.planId);
    const cost = plan ? (duration / plan.duration) * plan.price : 0;

    const updatedSession = await Session.findByIdAndUpdate(
      req.params.id,
      {
        endTime,
        duration,
        cost,
        status: 'completed',
      },
      { new: true }
    );

    // Update station status back to available
    await Station.findByIdAndUpdate(session.stationId, { status: 'available' });

    res.json(updatedSession);
  } catch (error) {
    console.error('[v0] End session error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Pause session
router.post('/:id/pause', async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { status: 'paused' },
      { new: true }
    );

    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json(session);
  } catch (error) {
    console.error('[v0] Pause session error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Resume session
router.post('/:id/resume', async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { status: 'active' },
      { new: true }
    );

    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json(session);
  } catch (error) {
    console.error('[v0] Resume session error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
