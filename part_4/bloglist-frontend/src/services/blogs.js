import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createNewBlog = async (data) => {
  try {
    const res = await axios.post(baseUrl, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const addLike = async (id, data) => {
  try {
    const res = await axios.put(`${baseUrl}/${id}`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const deleteBlog = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/${id}`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export default { getAll, createNewBlog, addLike, deleteBlog };
