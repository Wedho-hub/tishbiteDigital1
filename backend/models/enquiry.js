/**
 * Enquiry Model
 * Defines the schema for a user enquiry (contact form submission).
 * Fields: name, email, message, createdAt
 *
 * Example usage:
 *   const enquiry = await Enquiry.create({ name: 'John', email: 'john@example.com', message: '...' });
 */
import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model("Enquiry", enquirySchema);
