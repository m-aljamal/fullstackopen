import React, { useState, useEffect } from "react";
import ToggleForm from "./ToggleForm";
import blogService from "../services/blogs";

const Blog = ({ blog: { title, url, author, likes, id }, deleteBlog }) => {
  const [like, setLike] = useState(likes);
  const handleLikeClick = async () => {
    await blogService.addLike(id, {
      title,
      url,
      author,
      likes: 1,
    });
    setLike((old) => old + 1);
  };
  const handleDelete = () => {
    const confirm = window.confirm(
      `Remove blog you are not gonna need it! by ${author}`
    );
    if (confirm) {
      deleteBlog(id);
    }
  };
  return (
    <div
      style={{
        border: "1px solid black",
        margin: "15px 0px",
        padding: "10px 10px",
        width: "50%",
      }}
    >
      {title}
      <ToggleForm label="view" hideLabel="hide">
        <div>
          <p>Link: {url}</p>
          <p>
            Likes: {like} <button onClick={handleLikeClick}>like</button>
          </p>
          <p>Author: {author}</p>
        </div>
          <button onClick={handleDelete}>remove</button>
      </ToggleForm>
    </div>
  );
};
export default Blog;
