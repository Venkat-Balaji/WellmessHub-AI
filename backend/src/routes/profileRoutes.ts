import express from "express";
import { protect } from "../middleware/authMiddleware";
import User from "../models/User";

const router = express.Router();

// ✅ Get current profile
router.get("/", protect, async (req, res) => {
  res.json((req as any).user);
});

// ✅ Update profile
router.put("/", protect, async (req, res) => {
  const user = (req as any).user;
  const { name, profilePic } = req.body;

  user.name = name || user.name;
  user.profilePic = profilePic || user.profilePic;
  await user.save();

  res.json(user);
});

export default router;
