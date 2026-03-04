/**
 * Project Model
 * Defines the schema for a project in the Tishbite Digital portfolio.
 * Fields: title, description, image, link, createdAt, updatedAt
 *
 * Example usage:
 *   const project = await Project.create({ title: 'My App', description: '...', image: 'url', link: 'https://...' });
 */
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
