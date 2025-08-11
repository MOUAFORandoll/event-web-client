import axios from "axios";
import store from "@/store";
console.log("process.env.BASE_URL", process.env.VUE_APP_BASE_URL);
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization header if token exists
instance.interceptors.request.use(
  (config) => {
    const token = store.getters && store.getters.accessToken;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optionally, handle 401 globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.response && error.response.status === 401) {
      // Clear auth on unauthorized
      if (store && store.dispatch) {
        store.dispatch("clearAuth");
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
