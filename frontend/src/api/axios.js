import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL: BASE_URL + "/api" });

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = "Bearer " + token;
  }
  return request;
});

export default api;
