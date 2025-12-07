const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  consultant: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultant', required: true },
  slot: {
    date: { type: String, required: true },
    time: { type: String, required: true }
  },
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Booking', BookingSchema);
