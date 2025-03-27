import axios from 'axios';

// Determinar la URL base según el entorno
const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction
  ? 'https://api.karaokekaribu.com/api'
  : 'http://localhost:5000/api';

// Crear instancia de axios
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar errores comunes como 401 (no autorizado)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;