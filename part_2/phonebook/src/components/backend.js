import axios from "axios";
const baseUrl = "/api/persons";
const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (data) => {
  try {
    const res = await axios.post(baseUrl, data);
    return res.data;
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data
  }
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
};

const update = async (id, data) => {
  const res = await axios.put(`${baseUrl}/${id}`, data);
  return res.data;
};

export default {
  getAll,
  create,
  remove,
  update,
};
