import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profilePic?: string;
  settings?: {
    theme: "light" | "dark";
    color: string;
    siteName: string;
    logoUrl?: string;
  };
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: String,
    settings: {
      theme: { type: String, default: "light" },
      color: { type: String, default: "#14b8a6" },
      siteName: { type: String, default: "WellnessHub" },
      logoUrl: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema, "user");
