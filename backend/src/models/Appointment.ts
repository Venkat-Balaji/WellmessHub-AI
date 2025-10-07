import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  title: string;
  client?: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  notes?: string;
  createdBy: mongoose.Types.ObjectId;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    title: { type: String, required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    notes: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IAppointment>("Appointment", appointmentSchema);
