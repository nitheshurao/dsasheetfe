
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL

});
console.log("process.env.API_BASE_URL",process.env.REACT_APP_API_BASE_URL
);
console.log(process.env)
instance.interceptors.request.use((config) => {
  const stored = JSON.parse(localStorage.getItem("dsaSheet"))
  const token = stored?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
