import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const getProfile = async (req: any, res: Response) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const updateProfile = async (req: any, res: Response) => {
  const { name, email, password, profilePic } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = name || user.name;
  user.email = email || user.email;
  user.profilePic = profilePic || user.profilePic;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    profilePic: updatedUser.profilePic,
  });
};
