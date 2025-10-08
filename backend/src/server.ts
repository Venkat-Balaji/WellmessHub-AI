import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import settingsRoutes from "./routes/settingsRoutes";


dotenv.config();
connectDB();

const app = express();

// ✅ CORS setup (must be before routes)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allows cookies
  })
);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => res.send("🚀 WellnessHub API running..."));

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
