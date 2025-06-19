import { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Crear el contexto de autenticación
export const AuthContext = createContext();

/**
 * Proveedor del contexto de autenticación
 * Gestiona el estado del usuario, token JWT y funciones de autenticación
 * Implementa buenas prácticas para el manejo seguro de autenticación
 */
export const AuthProvider = ({ children }) => {
  // Estado para usuario autenticado y cargando
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Establecer token de autorización para todas las peticiones
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Función para manejar errores de API
  const handleApiError = useCallback((error) => {
    const message = error.response?.data?.message || 
                    'Ha ocurrido un error en el servidor';
    setError(message);
    return message;
  }, []);

  // Verificar el token al cargar la aplicación
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/logout/verify');
        // En el backend, usuario está en req.user y se devuelve en la respuesta
        setUser(response.data.user);
        setError(null);
        setLoading(false);
      } catch (error) {
        console.error('Error verificando token:', error);
        // Si el token es inválido, hacer logout silenciosamente
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setLoading(false);
        // No mostrar toast aquí ya que es una verificación automática
      }
    };

    verifyToken();
  }, [token]);

  // Función para iniciar sesión
  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/login', credentials);
      const { token, client, message } = response.data;
      
      // Guardar token en localStorage y estado
      localStorage.setItem('token', token);
      setToken(token);
      setUser(client);
      setError(null);
      
      // Notificar al usuario
      toast.success(message || 'Sesión iniciada correctamente');
      
      // Si la cuenta no está verificada, mostrar advertencia
      if (client && !client.isVerified) {
        toast.warning('Tu cuenta no está verificada. Algunas funciones podrían estar limitadas.');
      }
      
      return true;
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función para registrar nuevos usuarios
  const register = async (userData) => {
    setLoading(true);
    try {
      // Validación básica de datos requeridos
      if (!userData.fullName || !userData.email || !userData.password || 
          !userData.age || !userData.country) {
        throw new Error('Todos los campos son obligatorios');
      }
      
      // Realizar petición de registro
      const response = await axios.post('/api/clients', userData);
      
      // Notificar éxito
      toast.success(response.data.message || 'Registro exitoso. Por favor verifica tu email.');
      setError(null);
      
      return true;
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función para verificar email con código
  const verifyEmail = async (verificationCode) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/email-verification/verify`, { code: verificationCode });
      toast.success(response.data.message || 'Email verificado correctamente');
      setError(null);
      
      // Si el usuario está logueado, actualizar su estado
      if (user) {
        setUser({...user, isVerified: true});
      }
      
      return true;
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    setLoading(true);
    try {
      // Llamar al endpoint de logout en el backend (si está autenticado)
      if (token) {
        await axios.post('/api/logout');
      }
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
      // Continuar con el proceso de logout incluso si falla la petición
    } finally {
      // Limpiar datos de sesión localmente
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      setError(null);
      delete axios.defaults.headers.common['Authorization'];
      toast.success('Has cerrado sesión correctamente');
      setLoading(false);
    }
  };

  // Comprobar si el usuario tiene un rol específico
  const hasRole = (role) => {
    return user && user.role === role;
  };

  // Comprobar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!user;
  };
  
  // Comprobar si el usuario es administrador
  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  // Valor del contexto que estará disponible para los componentes
  const authContextValue = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    verifyEmail,
    hasRole,
    isAuthenticated,
    isAdmin
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
