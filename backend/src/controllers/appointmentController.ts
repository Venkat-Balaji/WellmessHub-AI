import { Request, Response } from "express";
import Appointment from "../models/Appointment";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// ✅ Create Appointment
export const createAppointment = async (req: AuthenticatedRequest, res: Response) => {
  const { title, client, date, time, notes } = req.body;
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const appointment = await Appointment.create({
      title,
      client,
      date,
      time,
      notes,
      createdBy: req.user._id,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error });
  }
};

// ✅ Get All Appointments
export const getAppointments = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const appointments = await Appointment.find({ createdBy: req.user._id })
      .populate("client", "name email")
      .sort({ date: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

// ✅ Update Appointment
export const updateAppointment = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { title, client, date, time, status, notes } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    if (appointment.createdBy.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    appointment.title = title || appointment.title;
    appointment.client = client || appointment.client;
    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    appointment.status = status || appointment.status;
    appointment.notes = notes || appointment.notes;

    const updated = await appointment.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error });
  }
};

// ✅ Delete Appointment
export const deleteAppointment = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    if (appointment.createdBy.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await appointment.deleteOne();
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
  }
};
