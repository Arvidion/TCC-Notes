// src/api/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "backend-havas-352792921038.us-central1.run.app", 
  withCredentials: true, 
});

export default instance;

