import express from "express";
import { protect } from "../middleware/authMiddleware";
import User from "../models/User";

const router = express.Router();

/**
 * @route   GET /api/settings
 * @desc    Fetch user settings
 * @access  Private
 */
router.get("/", protect, async (req, res) => {
  try {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    res.json(user.settings || {});
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching settings" });
  }
});

/**
 * @route   PUT /api/settings
 * @desc    Update user settings
 * @access  Private
 */
router.put("/", protect, async (req, res) => {
  try {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { theme, color, siteName, logoUrl } = req.body;

    user.settings = {
      ...user.settings,
      theme: theme || user.settings?.theme || "light",
      color: color || user.settings?.color || "#14b8a6",
      siteName: siteName || user.settings?.siteName || "WellnessHub",
      logoUrl: logoUrl || user.settings?.logoUrl || "",
    };

    await user.save();
    res.json(user.settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({ message: "Server error updating settings" });
  }
});

export default router;
