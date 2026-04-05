import axios from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_URL;
const api = axios.create({
  baseURL: `${baseUrl}/api` || "http://localhost:4000/api",
  withCredentials: true,
});

export default api;
