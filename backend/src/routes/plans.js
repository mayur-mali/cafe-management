import express from 'express';
import Plan from '../models/Plan.js';

const router = express.Router();

// Get all plans
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort({ price: 1 });
    res.json(plans);
  } catch (error) {
    console.error('[v0] Get plans error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get plan by ID
router.get('/:id', async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.json(plan);
  } catch (error) {
    console.error('[v0] Get plan error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create plan
router.post('/', async (req, res) => {
  try {
    const { name, duration, price, description } = req.body;

    if (!name || !duration || price === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const plan = new Plan({
      name,
      duration,
      price,
      description,
    });

    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    console.error('[v0] Create plan error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update plan
router.put('/:id', async (req, res) => {
  try {
    const { name, duration, price, description, isActive } = req.body;

    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { name, duration, price, description, isActive },
      { new: true }
    );

    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.json(plan);
  } catch (error) {
    console.error('[v0] Update plan error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete plan
router.delete('/:id', async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('[v0] Delete plan error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
