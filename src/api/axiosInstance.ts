import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from '@/hooks/use-toast';
import { STORAGE_KEYS } from '@/constants';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log('📤 Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('📥 Response:', {
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Attempt to refresh token
        const response = await axios.post(
          `${axiosInstance.defaults.baseURL}/auth/refresh`,
          { refreshToken }
        );

        const { token } = response.data;
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

        // Retry original request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Clear auth data and redirect to login
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        
        toast({
          title: 'Sesión expirada',
          description: 'Por favor, inicia sesión nuevamente',
          variant: 'destructive',
        });

        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    const errorMessage = (error.response?.data as any)?.message || error.message || 'Error desconocido';
    
    toast({
      title: 'Error',
      description: errorMessage,
      variant: 'destructive',
    });

    // Log error in development
    if (import.meta.env.DEV) {
      console.error('❌ Error:', {
        status: error.response?.status,
        message: errorMessage,
        data: error.response?.data,
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
