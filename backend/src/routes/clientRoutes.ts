import express from "express";
import {
  createClient,
  getClients,
  updateClient,
  deleteClient,
} from "../controllers/clientController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(protect, createClient).get(protect, getClients);
router.route("/:id").put(protect, updateClient).delete(protect, deleteClient);

export default router; // ✅ REQUIRED
