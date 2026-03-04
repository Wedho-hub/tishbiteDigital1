/**
 * BlogPost Model
 * Defines the schema for a blog post.
 * Fields: title, content, author, image, metaTitle, metaDescription, keywords, createdAt, updatedAt
 *
 * Example usage:
 *   const post = await BlogPost.create({ title: '...', content: '...', author: '...', image: '...', metaTitle: '...', metaDescription: '...', keywords: ['web', 'dev'] });
 */
import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    metaTitle: {
      type: String,
      required: false,
      trim: true,
    },
    metaDescription: {
      type: String,
      required: false,
      trim: true,
    },
    keywords: [{
      type: String,
      trim: true,
    }],
  },
  { timestamps: true }
);

export default mongoose.model("BlogPost", blogPostSchema);
