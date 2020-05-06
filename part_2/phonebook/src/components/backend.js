import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (data) => {
  const res = await axios.post(baseUrl, data);
  return res.data;
};

const remove = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`);
  
  
};
export default {
  getAll,
  create,
  remove,
};
