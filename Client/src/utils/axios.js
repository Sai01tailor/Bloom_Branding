import axios from "axios";

const api = axios.create({
  baseURL: "https://bloom-branding-1.onrender.com/api",
  withCredentials: true,
});

export default api;
