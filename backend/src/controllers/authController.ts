import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import generateToken from "../utils/generateToken";

// ✅ Register
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user._id.toString());

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // set to true for HTTPS
        sameSite: "lax",
        path: "/",
      })
      .status(201)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id.toString());

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // ✅ use true only in HTTPS
        sameSite: "lax",
        path: "/",
      })
      .status(200)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Logout
export const logoutUser = async (req: Request, res: Response) => {
  res
    .clearCookie("token", { path: "/" })
    .status(200)
    .json({ message: "Logged out successfully" });
};
