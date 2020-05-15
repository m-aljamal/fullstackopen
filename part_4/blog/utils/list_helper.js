const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((sum, num) => sum + num);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, num) => (num.likes > max.likes ? num : max));
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
