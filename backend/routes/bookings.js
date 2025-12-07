const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create a booking
router.post('/', async (req, res) => {
  try {
    const { userId, consultantId, date, time } = req.body;

    if (!userId || !consultantId || !date || !time) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Check if this slot is already booked with this consultant
    const exists = await Booking.findOne({
      consultant: consultantId,
      "slot.date": date,
      "slot.time": time
    });

    if (exists) {
      return res.status(400).json({ error: 'Slot already booked' });
    }

    const booking = new Booking({
      user: userId,
      consultant: consultantId,
      slot: { date, time }
    });

    await booking.save();
    res.json({ message: 'Booking confirmed', booking });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
