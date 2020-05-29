import React, { useState, useEffect, createRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import users from "./services/users";
import Message from "./components/Message";
import "./App.css";
import BlogForm from "./components/BlogForm";
import ToggleForm from "./components/ToggleForm";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const blogFormRef = createRef(); // used to get the function from ToggleForm
  const addError = (error, type) => {
    setMessage({ error, type });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const createBlog = async (data) => {
    blogFormRef.current.toggleVisible();
    const blog = await blogService.createNewBlog(data);
    if (blog.error) {
      addError(blog.error, "error");
    } else {
      setBlogs([...blogs, blog]);
      addError(`a new blog ${blog.title} by ${blog.author} added`, "add");
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      if (localStorage.token) {
        setLoading(true);
        const loadUser = await users.loadUser();
        if (loadUser.error) {
          addError(loadUser.error, "error");
          setLoading(false);
        } else {
          setUser(loadUser);
          setLoading(false);
        }
      }
    };
    loadUser();
  }, []);

  const userLogin = async (data) => {
    setLoading(true);
    const userFound = await users.logIn(data);
    if (userFound.error) {
      addError(userFound.error, "error");
      setLoading(false);
    } else {
      setUser(userFound);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload(true);
  };

  const deleteBlog = async (id) => {
    const res = await blogService.deleteBlog(id);
    if (res.error) {
      addError(res.error, "error");
    } else {
      setBlogs(blogs.filter((blog) => blog.id !== id));
      addError(res.message, "remove");
    }
  };

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {message && <Message message={message} />}
          {!user ? (
            <LoginForm getFormData={userLogin} />
          ) : (
            <div>
              <h2>Blogs</h2>
              <div>
                <h3> {`${user.name} is logged in`} </h3>
                <button onClick={logout}>Logout</button>
              </div>
              <ToggleForm label="New blog" ref={blogFormRef} hideLabel="cancel">
                <BlogForm getBlogData={createBlog} />
              </ToggleForm>
              {blogs
                .sort((a, b) => a.likes + b.likes)
                .map((blog) => (
                  <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} />
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
