import axios from "axios";
import store from "@/store";
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
    const currentUser = store.getters && store.getters.currentUser;
    if (currentUser && (currentUser.id || currentUser._id)) {
      config.headers = config.headers || {};
      config.headers.uid = currentUser.id || currentUser._id;
      config.headers.timestamp = Date.now();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } 
    }

    console.log("config.headers", config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.response && error.response.status === 401) {
      if (store && store.dispatch) {
        store.dispatch("clearAuth");
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
