const express = require('express');
const router = express.Router();
const Consultant = require('../models/Consultant');
const User = require('../models/User');

// Public: list all consultants
router.get('/', async (req, res) => {
  try {
    const list = await Consultant.find({ available: true }).populate('user', 'name email');
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Optional: get slots for a consultant (if you use slots later)
router.get('/:id/slots', async (req, res) => {
  try {
    const consultant = await Consultant.findById(req.params.id);
    if (!consultant) return res.status(404).json({ error: 'Consultant not found' });
    res.json(consultant.slots || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Simple create consultant (for now, no auth)
router.post('/create', async (req, res) => {
  try {
    const { userId, bio, languages } = req.body;
    const u = await User.findById(userId);
    if (!u) return res.status(400).json({ error: 'User not found' });

    u.isConsultant = true;
    await u.save();

    const c = new Consultant({ user: userId, bio, languages });
    await c.save();
    res.json(c);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
