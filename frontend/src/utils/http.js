import axios from "axios";

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8000/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    
    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;
export default http;
