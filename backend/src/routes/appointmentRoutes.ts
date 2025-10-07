import express from "express";
import {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/")
  .post(protect, createAppointment)
  .get(protect, getAppointments);

router.route("/:id")
  .put(protect, updateAppointment)
  .delete(protect, deleteAppointment);

export default router;
