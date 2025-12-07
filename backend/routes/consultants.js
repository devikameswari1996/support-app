const express = require('express');
const router = express.Router();
const Consultant = require('../models/Consultant');

router.get('/', async (req, res) => {
  try {
    const list = await Consultant.find().populate('user', 'name email');
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
