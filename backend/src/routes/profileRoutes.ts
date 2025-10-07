import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// ✅ Correct syntax — each handler is a function
router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);

export default router;
