import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
const baseUrl = "/api/users";
const loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${baseUrl}/getUser`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const logIn = async (formData) => {
  try {
    const res = await axios.post(`${baseUrl}/login`, formData);
    localStorage.setItem("token", res.data);

    return await loadUser();
  } catch (error) {
    return error.response.data;
  }
};

export default { logIn, loadUser };
