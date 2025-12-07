const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Consultant = require('../models/Consultant');
const User = require('../models/User');

// Create a booking (without payment)
router.post('/', async (req, res) => {
  try {
    const { userId, consultantId, date, time } = req.body;

    // Check if slot is already booked
    const exists = await Booking.findOne({
      consultant: consultantId,
      "slot.date": date,
      "slot.time": time
    });

    if (exists) {
      return res.status(400).json({ error: 'Slot already booked' });
    }

    // Create new booking
    const booking = new Booking({
      user: userId,
      consultant: consultantId,
      slot: { date, time },
      status: 'Pending'
    });

    await booking.save();
    res.json({ message: 'Booking confirmed', booking });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
