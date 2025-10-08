import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import settingsRoutes from "./routes/settingsRoutes";

import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// ✅ Enable CORS to allow cookies from frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/settings", settingsRoutes);

export default app;
