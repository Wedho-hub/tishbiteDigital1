/**
 * Service Model
 * Defines the schema for a service offered by Tishbite Digital.
 * Fields: title, description, icon, createdAt, updatedAt
 *
 * Example usage:
 *   const service = await Service.create({ title: 'Web Design', description: '...', icon: 'web' });
 */
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["general", "bundle"],
      default: "general",
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
