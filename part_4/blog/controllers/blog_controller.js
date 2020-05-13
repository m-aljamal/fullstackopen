const Blog = require("../models/Blog");

const getAllBlogs = async (req, res, next) => {
  const blogs = await Blog.find({});

  if (blogs.length === 0) {
    const error = {
      name: "noDataFound",
      message: "No data found, create new data",
    };
    return next(error);
  }
  res.json(blogs);
};

const createNewBlog = async (req, res, next) => {
  try {
    const blog = await new Blog(req.body);
    await blog.save();
    res.json(blog);
  } catch (error) {
    next(error);
  }
};
exports.createNewBlog = createNewBlog;
exports.getAllBlogs = getAllBlogs;
