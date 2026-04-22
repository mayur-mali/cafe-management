import express from 'express';
import Bill from '../models/Bill.js';
import Session from '../models/Session.js';

const router = express.Router();

// Get all bills
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find().populate('sessionId').sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    console.error('[v0] Get bills error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get bills by status
router.get('/status/:status', async (req, res) => {
  try {
    const bills = await Bill.find({ status: req.params.status })
      .populate('sessionId')
      .sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    console.error('[v0] Get bills by status error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get bill by ID
router.get('/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('sessionId');
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    res.json(bill);
  } catch (error) {
    console.error('[v0] Get bill error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create bill
router.post('/', async (req, res) => {
  try {
    const { sessionId, stationId, customerName, sessionCost, items = [], discount = 0, taxRate = 0.1, paymentMethod = 'cash' } = req.body;

    if (!sessionId || !stationId || !customerName || sessionCost === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let itemsTotal = 0;
    items.forEach((item) => {
      item.totalPrice = item.quantity * item.unitPrice;
      itemsTotal += item.totalPrice;
    });

    const subtotal = sessionCost + itemsTotal;
    const tax = subtotal * taxRate;
    const total = subtotal + tax - discount;

    const bill = new Bill({
      sessionId,
      stationId,
      customerName,
      sessionCost,
      items,
      itemsTotal,
      subtotal,
      tax,
      taxRate,
      discount,
      total,
      paymentMethod,
      status: 'pending',
    });

    await bill.save();
    res.status(201).json(bill);
  } catch (error) {
    console.error('[v0] Create bill error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update bill
router.put('/:id', async (req, res) => {
  try {
    const { items, discount, taxRate, paymentMethod, notes } = req.body;

    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ error: 'Bill not found' });

    if (items) {
      let itemsTotal = 0;
      items.forEach((item) => {
        item.totalPrice = item.quantity * item.unitPrice;
        itemsTotal += item.totalPrice;
      });
      bill.items = items;
      bill.itemsTotal = itemsTotal;
    }

    if (discount !== undefined) bill.discount = discount;
    if (taxRate !== undefined) bill.taxRate = taxRate;
    if (paymentMethod) bill.paymentMethod = paymentMethod;
    if (notes) bill.notes = notes;

    // Recalculate total
    const subtotal = bill.sessionCost + bill.itemsTotal;
    bill.subtotal = subtotal;
    bill.tax = subtotal * bill.taxRate;
    bill.total = subtotal + bill.tax - bill.discount;

    await bill.save();
    res.json(bill);
  } catch (error) {
    console.error('[v0] Update bill error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mark bill as paid
router.post('/:id/pay', async (req, res) => {
  try {
    const { paymentMethod = 'cash' } = req.body;

    const bill = await Bill.findByIdAndUpdate(
      req.params.id,
      { status: 'paid', paymentMethod },
      { new: true }
    );

    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    res.json(bill);
  } catch (error) {
    console.error('[v0] Pay bill error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Cancel bill
router.post('/:id/cancel', async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    res.json(bill);
  } catch (error) {
    console.error('[v0] Cancel bill error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete bill
router.delete('/:id', async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    res.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    console.error('[v0] Delete bill error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get dashboard stats
router.get('/stats/daily', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const bills = await Bill.find({
      status: 'paid',
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const totalRevenue = bills.reduce((sum, bill) => sum + bill.total, 0);
    const totalBills = bills.length;
    const averageTransaction = totalBills > 0 ? totalRevenue / totalBills : 0;

    res.json({
      totalRevenue,
      totalBills,
      averageTransaction,
    });
  } catch (error) {
    console.error('[v0] Get stats error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
