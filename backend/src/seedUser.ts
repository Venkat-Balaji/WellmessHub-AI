import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User"; // ✅ make sure your User model path is correct

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected to MongoDB");

    const hashedPassword = await bcrypt.hash("password123", 10);

    const user = new User({
      name: "Demo User",
      email: "demo@wellnesshub.com",
      password: hashedPassword,
    });

    await user.save();
    console.log("✅ User seeded successfully:");
    console.log({
      email: user.email,
      password: "password123",
      hash: user.password,
    });

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Error seeding user:", err);
  }
};

seedUser();
