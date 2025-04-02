import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001/api/v1", // Backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
