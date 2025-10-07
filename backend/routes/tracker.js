import express from "express";
import Tracker from "../models/trackerData.js";

const router = express.Router();

// ===== Helper: calculate scores =====
const calculateScores = (tracker) => {
  const taskPoints = tracker.tasks.reduce(
    (acc, t) => {
      if (t.person1) acc.person1++;
      if (t.person2) acc.person2++;
      return acc;
    },
    { person1: 0, person2: 0 }
  );
  tracker.scores.person1 = taskPoints.person1 + tracker.water.person1;
  tracker.scores.person2 = taskPoints.person2 + tracker.water.person2;
};

// ===== Get tracker data =====
router.get("/", async (req, res) => {
  let tracker = await Tracker.findOne();
  if (!tracker) {
    tracker = await Tracker.create({}); // create default tracker if none
  }
  calculateScores(tracker);
  await tracker.save();
  res.json(tracker);
});

// ===== Toggle task =====
router.post("/task/:id/:person", async (req, res) => {
  const { id, person } = req.params;
  const tracker = await Tracker.findOne();
  if (!tracker) return res.status(404).json({ error: "Tracker not found" });

  const task = tracker.tasks.id(id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  if (person === "person1" || person === "person2") {
    task[person] = !task[person];
    calculateScores(tracker);
    await tracker.save();
    return res.json({ success: true, task });
  }
  res.status(400).json({ error: "Invalid person" });
});

// ===== Add water =====
router.post("/water/:person", async (req, res) => {
  const { person } = req.params;
  const tracker = await Tracker.findOne();
  if (!tracker) return res.status(404).json({ error: "Tracker not found" });

  if (person === "person1" || person === "person2") {
    tracker.water[person]++;
    calculateScores(tracker);
    await tracker.save();
    return res.json({ success: true, water: tracker.water });
  }
  res.status(400).json({ error: "Invalid person" });
});

// ===== Reset tracker =====
router.post("/reset", async (req, res) => {
  const tracker = await Tracker.findOne();
  if (!tracker) return res.status(404).json({ error: "Tracker not found" });

  tracker.tasks.forEach(t => {
    t.person1 = false;
    t.person2 = false;
  });
  tracker.water.person1 = 0;
  tracker.water.person2 = 0;
  tracker.scores.person1 = 0;
  tracker.scores.person2 = 0;
  tracker.lastReset = new Date();
  await tracker.save();

  res.json({ success: true, tracker });
});

export default router;
