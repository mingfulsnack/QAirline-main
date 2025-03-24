// src/api/axios.js
import axios from "axios";

// Tạo instance của axios với config mặc định
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // URL cơ sở của API
  timeout: 5000, // Thời gian timeout: 5 giây
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // Thêm headers mặc định khác nếu cần
  },
});

// Add interceptor để xử lý request trước khi gửi đi
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage (nếu có authentication)
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // config.headers.role = localStorage.getItem("role");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add interceptor để xử lý response
axiosInstance.interceptors.response.use(
  (response) => {
    // Trả về dữ liệu cho component
    return response.data;
  },
  (error) => {
    // Xử lý các lỗi response
    if (error.response) {
      // Lỗi từ server (status code không phải 2xx)
      switch (error.response.status) {
        // case 401:
        //   // Xử lý lỗi unauthorized
        //   localStorage.removeItem("token");
        //   // window.location.href = "/login";
        //   break;
        // case 404:
        //   // Xử lý lỗi not found
        //   console.error("Resource not found");
        //   break;
        default:
          console.error("Server error:", error.response.data);
      }
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      console.error("No response received:", error.request);
    } else {
      // Lỗi khi setting up request
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
