import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import trackerRoutes from "./routes/tracker.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/trackerdb";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// API routes
app.use("/api/tracker", trackerRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Tracker Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
