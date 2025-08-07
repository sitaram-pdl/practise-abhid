


import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
});

//  here we have to add token to every request if token is present:  

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

/*
// A typical API flow in my dashboard is:

User submits login form → React sends credentials to API → 
API verifies → Returns token → React stores token → 
Dashboard uses token for protected requests

*/


