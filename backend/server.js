const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env file!");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("🎄 Connected to MongoDB Atlas!"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// RSVP Schema
const rsvpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
  },
  answer: {
    type: String,
    required: true,
    enum: ["yes", "no"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RSVP = mongoose.model("RSVP", rsvpSchema);

// POST endpoint to save RSVP
app.post("/api/rsvp", async (req, res) => {
  try {
    const { name, answer } = req.body;

    if (!name || !answer) {
      return res.status(400).json({
        success: false,
        message: "Name and answer required",
      });
    }

    if (answer !== "yes" && answer !== "no") {
      return res.status(400).json({
        success: false,
        message: "Answer must be yes or no",
      });
    }

    const rsvp = new RSVP({
      name: name.trim(),
      answer,
    });

    await rsvp.save();

    console.log(`🎅 New RSVP: ${name} - ${answer}`);

    res.json({
      success: true,
      message: "HO HO HO!!! RSVP recorded!",
    });
  } catch (error) {
    console.error("Error saving RSVP:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// GET endpoint to view all RSVPs
app.get("/api/rsvp", async (req, res) => {
  try {
    const rsvps = await RSVP.find().sort({ createdAt: -1 });

    // Group by yes/no
    const yesList = rsvps.filter((r) => r.answer === "yes");
    const noList = rsvps.filter((r) => r.answer === "no");

    res.json({
      success: true,
      yes: yesList.map((r) => ({ name: r.name, createdAt: r.createdAt })),
      no: noList.map((r) => ({ name: r.name, createdAt: r.createdAt })),
      total: rsvps.length,
    });
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "🎄 Server is running!" });
});

app.listen(PORT, () => {
  console.log(`🎅 Christmas RSVP server running on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}/api`);
});
