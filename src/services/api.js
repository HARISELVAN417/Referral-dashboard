import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL =
  "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;