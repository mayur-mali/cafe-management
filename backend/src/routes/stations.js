import express from 'express';
import Station from '../models/Station.js';

const router = express.Router();

// Get all stations
router.get('/', async (req, res) => {
  try {
    const stations = await Station.find({ isActive: true }).sort({ stationNumber: 1 });
    res.json(stations);
  } catch (error) {
    console.error('[v0] Get stations error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get station by ID
router.get('/:id', async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) return res.status(404).json({ error: 'Station not found' });
    res.json(station);
  } catch (error) {
    console.error('[v0] Get station error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create station
router.post('/', async (req, res) => {
  try {
    const { name, stationNumber, systemType, specs, pricePerHour } = req.body;

    if (!name || !stationNumber || !systemType || !pricePerHour) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const station = new Station({
      name,
      stationNumber,
      systemType,
      specs,
      pricePerHour,
    });

    await station.save();
    res.status(201).json(station);
  } catch (error) {
    console.error('[v0] Create station error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update station
router.put('/:id', async (req, res) => {
  try {
    const { name, stationNumber, systemType, specs, status, pricePerHour, isActive } = req.body;

    const station = await Station.findByIdAndUpdate(
      req.params.id,
      { name, stationNumber, systemType, specs, status, pricePerHour, isActive },
      { new: true }
    );

    if (!station) return res.status(404).json({ error: 'Station not found' });
    res.json(station);
  } catch (error) {
    console.error('[v0] Update station error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update station status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['available', 'occupied', 'maintenance'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const station = await Station.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!station) return res.status(404).json({ error: 'Station not found' });
    res.json(station);
  } catch (error) {
    console.error('[v0] Update station status error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete station
router.delete('/:id', async (req, res) => {
  try {
    const station = await Station.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!station) return res.status(404).json({ error: 'Station not found' });
    res.json({ message: 'Station deleted successfully' });
  } catch (error) {
    console.error('[v0] Delete station error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
