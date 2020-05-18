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

const createNewBlog = async (req, res) => {
  const blog = await new Blog(req.body);
  await blog.save();
  res.json(blog);
};

const deleteBlog = async (req, res, next) => {
  const findBlog = await Blog.findByIdAndRemove(req.params.id);
  if (!findBlog) {
    const error = {
      name: "NoDataWithId",
      message: "No data found with the id",
    };
    return next(error);
  }
  res.json({ message: "blog deleted" });
};

const updateBlog = async (req, res) => {
  const body = req.body;
  const blog = await Blog.findById(req.params.id);
  const newBlog = {};
  if (body.title) newBlog.title = body.title;
  if (body.author) newBlog.author = body.author;
  if (body.url) newBlog.url = body.url;
  if (body.likes) newBlog.likes = blog.likes + body.likes;

  const updateBlog = await Blog.findByIdAndUpdate(blog, newBlog, { new: true });
  res.json(updateBlog);
};
exports.updateBlog = updateBlog;
exports.createNewBlog = createNewBlog;
exports.getAllBlogs = getAllBlogs;
exports.deleteBlog = deleteBlog;
