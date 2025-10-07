import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // 👈 REQUIRED to parse JSON body
app.use(express.urlencoded({ extended: true })); // 👈 handles form data

app.get("/", (req, res) => {
  res.send("✅ WellnessHub API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
