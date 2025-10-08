import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

// ✅ GET /api/profile — Return user info
export const getProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err: any) {
    console.error("Error fetching profile:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ PUT /api/profile — Update name, password, or profile picture
export const updateProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, password, profilePic } = req.body;

    if (name) user.name = name;
    if (profilePic) user.profilePic = profilePic;

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
    });
  } catch (err: any) {
    console.error("Error updating profile:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
