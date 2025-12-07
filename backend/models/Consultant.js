const mongoose = require('mongoose');

const ConsultantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String, default: "" },
  languages: { type: [String], default: ["English"] },
  available: { type: Boolean, default: true },
  slots: [
    {
      date: String,
      times: [String]
    }
  ]
});

module.exports = mongoose.model('Consultant', ConsultantSchema);
