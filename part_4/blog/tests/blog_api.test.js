const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/Blog");

const initialBlog = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObj = initialBlog.map((blog) => new Blog(blog));
  const promiseArray = blogObj.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("Return the blog list in JSON format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("check for id name", async () => {
  const res = await api.get("/api/blogs");
  expect(res.body[0].id).toBeDefined();
});

test("create new blog in database", async () => {
  const newBlog = {
    title: "jest test for node",
    author: "Mohammed",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("check if likes is missing the default is 0", async () => {
  const newBlog = {
    title: "new test with 0 likes",
    author: "Mohammed",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  };
  const res = await api.post("/api/blogs").send(newBlog);

  expect(res.body.likes).toBe(0);
});

test("check title and url", async () => {
  await api.post("/api/blogs").send({ author: "test" }).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
