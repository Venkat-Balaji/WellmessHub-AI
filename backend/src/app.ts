import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import clientRoutes from "./routes/clientRoutes";
// import reportRoutes from "./routes/reportRoutes";
// import programRoutes from "./routes/programRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// 🧠 Base route (for health check)
app.get("/", (req, res) => {
  res.send("✅ WellnessHub Backend is running...");
});

// ✅ Mount routers (make sure all are valid)
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/programs", programRoutes);
app.use("/api/appointments", appointmentRoutes);

export default app;
