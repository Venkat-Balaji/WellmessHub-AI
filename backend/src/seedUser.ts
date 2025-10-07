import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/User";

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Connected to MongoDB");

    const email = "demo@wellnesshub.com";

    // Delete existing user with same email (to avoid duplicates)
    await User.deleteOne({ email });

    const hashedPassword = await bcrypt.hash("password123", 10);

    const newUser = await User.create({
      name: "Demo User",
      email,
      password: hashedPassword,
    });

    console.log("✅ User seeded successfully:");
    console.log({
      email: newUser.email,
      password: "password123",
      hash: hashedPassword,
    });

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error seeding user:", error.message);
    process.exit(1);
  }
};

seedUser();
