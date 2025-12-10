const express = require('express');
const router = express.Router();
const Consultant = require('../models/Consultant');

router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId; // Read userId from request
    console.log("Received userId:", userId);
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const list = await Consultant.find({ user: userId })
      .populate('user', 'name email');

    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
