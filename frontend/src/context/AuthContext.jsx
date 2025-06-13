import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Crear el contexto de autenticación
export const AuthContext = createContext();

/**
 * Proveedor del contexto de autenticación
 * Gestiona el estado del usuario, token JWT y funciones de autenticación
 */
export const AuthProvider = ({ children }) => {
  // Estado para usuario autenticado y cargando
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Establecer token de autorización para todas las peticiones
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Verificar el token al cargar la aplicación
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/auth/verify');
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error verificando token:', error);
        // Si el token es inválido, hacer logout
        await logout();
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  // Función para iniciar sesión
  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      
      toast.success('Sesión iniciada correctamente');
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
      toast.error(errorMessage);
      return false;
    }
  };

  // Función para registrar nuevos usuarios
  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      toast.success('Registro exitoso. Por favor verifica tu email.');
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al registrarse';
      toast.error(errorMessage);
      return false;
    }
  };

  // Función para verificar email
  const verifyEmail = async (verificationToken) => {
    try {
      const response = await axios.post(`/api/auth/verify-email`, { token: verificationToken });
      toast.success('Email verificado correctamente');
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al verificar email';
      toast.error(errorMessage);
      return false;
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Has cerrado sesión');
  };

  // Comprobar si el usuario tiene un rol específico
  const hasRole = (role) => {
    return user && user.role === role;
  };

  // Comprobar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!user;
  };

  // Valor del contexto que estará disponible para los componentes
  const authContextValue = {
    user,
    loading,
    login,
    register,
    logout,
    verifyEmail,
    hasRole,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
