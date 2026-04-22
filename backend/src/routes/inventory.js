import express from 'express';
import Inventory from '../models/Inventory.js';

const router = express.Router();

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find().sort({ category: 1, itemName: 1 });
    res.json(inventory);
  } catch (error) {
    console.error('[v0] Get inventory error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get inventory by category
router.get('/category/:category', async (req, res) => {
  try {
    const items = await Inventory.find({ category: req.params.category }).sort({ itemName: 1 });
    res.json(items);
  } catch (error) {
    console.error('[v0] Get category inventory error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get low stock items
router.get('/low-stock', async (req, res) => {
  try {
    const items = await Inventory.find({
      $expr: { $lte: ['$quantity', '$reorderLevel'] },
    }).sort({ quantity: 1 });
    res.json(items);
  } catch (error) {
    console.error('[v0] Get low stock error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get inventory item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Inventory item not found' });
    res.json(item);
  } catch (error) {
    console.error('[v0] Get inventory item error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create inventory item
router.post('/', async (req, res) => {
  try {
    const { itemName, category, quantity, reorderLevel, unitPrice, supplier } = req.body;

    if (!itemName || !category || quantity === undefined || !unitPrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const item = new Inventory({
      itemName,
      category,
      quantity,
      reorderLevel: reorderLevel || 10,
      unitPrice,
      supplier,
      lastRestocked: new Date(),
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error('[v0] Create inventory error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update inventory item
router.put('/:id', async (req, res) => {
  try {
    const { itemName, category, quantity, reorderLevel, unitPrice, supplier, notes } = req.body;

    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      { itemName, category, quantity, reorderLevel, unitPrice, supplier, notes },
      { new: true }
    );

    if (!item) return res.status(404).json({ error: 'Inventory item not found' });
    res.json(item);
  } catch (error) {
    console.error('[v0] Update inventory error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Restock inventory item
router.post('/:id/restock', async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity === undefined || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Inventory item not found' });

    item.quantity += quantity;
    item.lastRestocked = new Date();
    await item.save();

    res.json(item);
  } catch (error) {
    console.error('[v0] Restock inventory error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Deduct inventory item
router.post('/:id/deduct', async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity === undefined || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Inventory item not found' });

    if (item.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    item.quantity -= quantity;
    await item.save();

    res.json(item);
  } catch (error) {
    console.error('[v0] Deduct inventory error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete inventory item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Inventory item not found' });
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error('[v0] Delete inventory error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
