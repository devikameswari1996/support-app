require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const consultantRoutes = require("./routes/consultants");
const bookingRoutes = require("./routes/bookings");

const app = express();

// 1) Correct CORS middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 2) Handle ALL preflight requests correctly
app.options("*", cors());

// 3) JSON body parser
app.use(express.json());

// Root test route
app.get("/", (req, res) => {
  res.send("Support App backend is running");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/consultants", consultantRoutes);
app.use("/api/bookings", bookingRoutes);

// 4) Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB Error:", err));
