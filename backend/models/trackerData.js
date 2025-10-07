import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  person1: { type: Boolean, default: false },
  person2: { type: Boolean, default: false }
});

const trackerSchema = new mongoose.Schema({
  tasks: [taskSchema],
  water: {
    person1: { type: Number, default: 0 },
    person2: { type: Number, default: 0 }
  },
  scores: {
    person1: { type: Number, default: 0 },
    person2: { type: Number, default: 0 }
  },
  lastReset: { type: Date, default: Date.now }
});

export default mongoose.model("Tracker", trackerSchema);
