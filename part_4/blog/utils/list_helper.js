const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((sum, num) => sum + num);
};

const favoriteBlog = (blogs) => {
  const res = blogs.reduce((max, num) => (num.likes > max.likes ? num : max));
  return (obj = {
    title: res.title,
    author: res.author,
    likes: res.likes,
  });
};

const mostBlogs = (blogs) => {
  const names = blogs.map((blog) => blog.author);
  const blogsAuthor = _.values(_.groupBy(names)).map((blog) => ({
    author: blog[0],
    blogs: blog.length,
  }));
  return blogsAuthor.reduce((max, num) => (num.blogs > max.blogs ? num : max));
};

const mostLikes = (blogs) => {
  const authors = blogs.reduce(
    (sum, num) => (
      (sum[num["author"]] = sum[num["author"]] + num["likes"] || num["likes"]),
      sum
    ),
    {}
  );

  const highScore = Math.max(...Object.values(authors));

  const author = Object.keys(authors).filter(
    (auth) => authors[auth] === highScore
  );

  return { author: author[0], likes: highScore };
};
module.exports = {
  mostLikes,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
