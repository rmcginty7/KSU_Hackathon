import axios from "axios";

const api = axios.create({
  // Use Expo public env when set, otherwise default to local backend port
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001/api",
  timeout: 10000,
});

export default api;
