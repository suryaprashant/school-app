import {
  createBlogService,
  getAllBlogsService,
  getBlogByIdService,
} from "../services/blog-services.js";

// POST /blogs
export const createBlog = async (req, res) => {
  try {
    const newBlog = await createBlogService(req.body);
    res.status(201).json({
      status: "success",
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};

// GET /blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await getAllBlogsService();
    res.status(200).json({
      status: "success",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

// GET /blogs/:id
export const getBlogById = async (req, res) => {
  try {
    const blog = await getBlogByIdService(req.params.id);
    res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    res.status(404).json({ status: "failed", message: error.message });
  }
};
