const Blog = require("../models/Blog");
const User = require("../models/User");
const getAllBlogs = async (req, res, next) => {
  const blogs = await Blog.find({}).populate("user", { userName: 1, name: 1 });

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
  const { title, url, likes, author } = req.body;
  const findUser = await User.findById(req.user.id);
  const blog = new Blog({
    author,
    title,
    url,
    likes,
    user: req.user.id,
  });
  const savedBlog = await blog.save();
  findUser.blogs = findUser.blogs.concat(savedBlog._id);
  await findUser.save();
  res.json(blog);
};

const deleteBlog = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  const user = await User.findById(req.user.id);

  if (!blog) {
    const error = {
      name: "NoDataWithId",
      message: "No data found with the id",
    };
    return next(error);
  }
  if (blog.user.toString() !== req.user.id) {
    const error = {
      name: "notAuthorized",
      message: "You can not delete this blog",
    };
    return next(error);
  }
  const index = user.blogs.indexOf(req.params.id);
  user.blogs.splice(index, 1);
  await user.save();
  await Blog.findByIdAndRemove(req.params.id);
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
