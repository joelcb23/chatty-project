import axios from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_URL;
const instance = axios.create({
  baseURL: `${baseUrl}/api` || "http://localhost:4000/api",
  withCredentials: true,
});

export default instance;
