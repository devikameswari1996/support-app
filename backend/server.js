require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const consultantRoutes = require('./routes/consultants');
const bookingRoutes = require('./routes/bookings');

const app = express();
app.use(cors({
  origin: '*',
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/consultants', consultantRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Mongo connected');
    app.listen(PORT, ()=> console.log('Server running on', PORT));
  })
  .catch(err => { console.error(err); });