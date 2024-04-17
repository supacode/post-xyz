import axios from 'axios';

export const axiosInstance = axios.create({
  // baseURL: 'http://localhost:4000/',
  // baseURL: 'https://jsonplaceholder.typicode.com/',
  baseURL: import.meta.env.VITE_APP_SERVICE_URL,
});
