import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Set the base URL for your backend API
});

export default api;