import Blog from "../models/blog-model.js";

// Create a new blog
export const createBlogService = async (blogData) => {
  const { title, highlight, description, contributor } = blogData;

  if (!title || !highlight || !description || !contributor) {
    throw new Error("All fields are required");
  }

  const newBlog = new Blog({
    title,
    highlight,
    description,
    contributor,
  });

  return await newBlog.save();
};

// Get all blogs
export const getAllBlogsService = async () => {
  return await Blog.find().sort({ createdAt: -1 });
};

// Get single blog by ID
export const getBlogByIdService = async (id) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new Error("Blog not found");
  }
  return blog;
};
