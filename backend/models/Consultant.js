const mongoose = require("mongoose");

const ConsultantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bio: String,
  languages: [String],
  available: { type: Boolean, default: true },
  slots: [
    {
      date: String,
      times: [String]
    }
  ]
});

module.exports = mongoose.model("Consultant", ConsultantSchema);
