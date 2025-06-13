import axios from 'axios';

// Configuración de la URL base para todas las peticiones
// Asegúrate de que apunte a tu API backend
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Configuración para manejar errores de red
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('Error de red o servidor no disponible');
    }
    return Promise.reject(error);
  }
);

export default axios;
