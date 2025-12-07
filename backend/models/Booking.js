const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  consultant: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultant', required: true },
  slot: {
    date: { type: String, required: true },  // e.g. "2025-12-07"
    time: { type: String, required: true }   // e.g. "15:30"
  },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
