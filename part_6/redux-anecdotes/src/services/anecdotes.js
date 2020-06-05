import axios from "axios";
const baseURL = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const res = await axios.get(baseURL);
  return res.data;
};

export const createNew = async (content) => {
  const obj = { content, votes: 0 };
  const res = await axios.post(baseURL, obj);
  return res.data;
};

export const getAnecdotes = async (id) => {
  const founAne = await axios.get(`${baseURL}/${id}`);
  return founAne.data;
};

export const addVoteToServer = async (id) => {
  const anecdotes = await getAnecdotes(id);
  anecdotes.votes = anecdotes.votes + 1;
  const res = await axios.put(`${baseURL}/${id}`, anecdotes);
  return res.data;
};
