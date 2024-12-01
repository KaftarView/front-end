import axios from "axios";
import { getToken, setToken, removeToken, isTokenExpired , getRefreshToken } from "./jwt";

const apiClient = axios.create({
  baseURL: "https://e773-212-64-199-253.ngrok-free.app", // Replace with your backend URL
});


let isRefreshing = false;
let failedQueue: any[] = [];

// Function to process requests in the queue after refreshing the token
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (token) {
      promise.resolve(token);
    } else {
      promise.reject(error);
    }
  });
  failedQueue = [];
};

// Request interceptor: Add access token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is unauthorized and it's not a refresh attempt
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If a refresh is already in progress, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true; // Mark the request as retrying
      isRefreshing = true;

      try {
        // Call the refresh token endpoint

        const refreshToken = getRefreshToken();
        const { data } = await axios.post('https://e773-212-64-199-253.ngrok-free.app/v1/auth/refresh-token', {
          refreshToken,
        });


        const { token } = data.data; // Replace with your backend's token structure
        setToken(token); // Save the new access token
        processQueue(null, token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        removeToken(); // Clear tokens if refresh fails
        window.location.href = "/login"; // Redirect to login page
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
