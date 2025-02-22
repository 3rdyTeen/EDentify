import axios from 'axios';
import { getCookie } from 'cookies-next';

// Create an Axios instance with default configuration
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api', // Base URL for API requests
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
});

// Add request interceptor (optional)
apiClient.interceptors.request.use(
  (config) => {
    // Modify the request config before sending (e.g., add auth token)
    const token = getCookie('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor (optional)
apiClient.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response.data; // Return only the data part of the response
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('No response received:', error.request);
      return Promise.reject({ message: 'No response received from the server.' });
    } else {
      // Something happened in setting up the request
      console.error('Request setup error:', error.message);
      return Promise.reject({ message: 'Error setting up the request.' });
    }
  }
);

// Export utility functions for common HTTP methods
export const get = async <T>(url: string, params?: object): Promise<T> => {
  const response = await apiClient.get<T>(url, { params });
  return response.data;
};

export const post = async <T>(url: string, data?: object): Promise<T> => {
  const response = await apiClient.post<T>(url, data);
  return response.data;
};

export const put = async <T>(url: string, data?: object): Promise<T> => {
  const response = await apiClient.put<T>(url, data);
  return response.data;
};

export const patch = async <T>(url: string, data?: object): Promise<T> => {
  const response = await apiClient.patch<T>(url, data);
  return response.data;
};

export const del = async <T>(url: string): Promise<T> => {
  const response = await apiClient.delete<T>(url);
  return response.data;
};