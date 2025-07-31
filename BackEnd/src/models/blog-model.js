
import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  highlight: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contributor: {
    type: [String], // Changed from String to Array of Strings
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

const Blog = mongoose.model('blogs', BlogSchema);
export default Blog;
