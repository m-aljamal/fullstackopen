import React, { useState } from "react";

const BlogForm = ({ getBlogData }) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    author: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getBlogData(formData);
    setFormData({
      title: "",
      url: "",
      author: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Create new blog</h3>
      <div>
        <p>Title:</p>
        <input
          type="text"
          value={formData.title}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div>
        <p>URL:</p>
        <input
          type="text"
          value={formData.url}
          name="url"
          onChange={handleChange}
        />
      </div>
      <div>
        <p>Author:</p>
        <input
          type="text"
          value={formData.author}
          name="author"
          onChange={handleChange}
        />
      </div>
     
        <button style={{margin: '25px'}} type="submit">Submit</button>
   
    </form>
  );
};

export default BlogForm;
