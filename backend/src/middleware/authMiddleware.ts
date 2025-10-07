import jwt from "jsonwebtoken";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";

export const protect = async (req: any, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("🔐 Verifying token:", token);

      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      console.log("✅ Decoded user ID:", decoded.id);

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        console.error("❌ No user found for token ID:", decoded.id);
        return res.status(404).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("❌ JWT verification failed:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.error("❌ No authorization header found");
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
