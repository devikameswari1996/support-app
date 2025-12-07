const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Consultant = require('../models/Consultant');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashed,
      isConsultant: true   // ← MAKE EVERYONE CONSULTANT
    });

    await user.save();

    // Create consultant profile automatically
    const consultant = new Consultant({
      user: user._id,
      bio: "Available for emotional support and consultation.",
      languages: ["English"],
      available: true
    });

    await consultant.save();

    res.json({ message: 'User created', user, consultant });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, "secret123", { expiresIn: "7d" });

    res.json({ message: "Login successful", token, user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
