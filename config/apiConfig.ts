import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface ApiResponse {
  message?: string;
  [key: string]: any;
}

// Configure environment variables
const API_URL = "https://api.looopmusic.com";
const API_TIMEOUT = process.env.API_TIMEOUT || 30000;
//https://api.looopmusic.com
//http://localhost:3000

const api = axios.create({
  baseURL: API_URL,
//   timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  validateStatus: (status) => status >= 200 && status < 300,
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ApiResponse>) => {
    const originalRequest = error.config as RetryConfig;

    // Handle network errors
    if (!error.response) {
      const message = "Network error occurred. Please check your internet connection.";
      throw new Error(message);
    }

    // Handle specific HTTP status codes
    let errorMessage = '';
    switch (error.response.status) {
      case 400:
        errorMessage = error.response.data?.message || 'Bad Request';
        break;

      case 401:
        errorMessage = error.response.data?.message || 'Unauthorized access';
        break;

      case 403:
        errorMessage = error.response.data?.message || 'Access forbidden';
        break;

      case 404:
        errorMessage = error.response.data?.message || 'Resource not found';
        break;

      case 409:
        errorMessage = error.response.data?.message || 'Conflict occurred';
        break;

      case 429:
        errorMessage = error.response.data?.message || 'Too many requests';
        break;

      case 500:
        errorMessage = error.response.data?.message || 'Server error occurred';
        break;
      case 502:
      case 503:
        errorMessage = error.response.data?.message || 'Server error occurred';
        break;

      default:
        errorMessage = error.response.data?.message || 'An unexpected error occurred';
    }

    // Retry logic for 5xx errors
    if (error.response.status >= 500 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(api(originalRequest));
        }, 3000); // Retry after 3 seconds
      });
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
