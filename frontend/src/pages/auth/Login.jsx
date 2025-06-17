import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiLogIn, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { FaDiceD20 } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

/**
 * Página de inicio de sesión mejorada con efectos visuales
 */
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Efectos para manejo de mensajes dependiendo de estados de navegación
  useEffect(() => {
    // Mostrar mensaje si viene de registro exitoso
    const params = new URLSearchParams(location.search);
    if (params.get('registered') === 'true') {
      toast.success('Registro exitoso. Inicia sesión con tus credenciales.');
    }
  }, [location]);
  
  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  const onSubmit = async (data) => {
    setLoading(true);
    setAuthError(null);
    
    try {
      const success = await login({
        email: data.email,
        password: data.password
      });
      
      if (success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      setAuthError('Credenciales incorrectas. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-md mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo animado */}
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
      >
        <div className="h-20 w-20 bg-primary/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-primary/30">
          <FaDiceD20 className="h-10 w-10 text-primary" />
        </div>
      </motion.div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-display mb-2 text-gradient">Bienvenido de nuevo</h1>
        <p className="text-neutral/70">Ingresa a tu cuenta para continuar</p>
      </div>
      
      {/* Mensaje de error de autenticación */}
      <AnimatePresence>
        {authError && (
          <motion.div 
            className="bg-error/20 border border-error/30 text-error rounded-lg p-3 mb-6 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <FiAlertCircle className="mr-2 flex-shrink-0" />
            <span className="text-sm">{authError}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium block">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-neutral/50" />
            </div>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email", { 
                required: "Email es requerido",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de email inválido"
                }
              })}
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-secondary/70 backdrop-blur-sm border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="tu@email.com"
            />
          </div>
          {errors.email && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-sm text-error mt-1 flex items-center"
            >
              <FiAlertCircle className="mr-1" size={14} />
              {errors.email.message}
            </motion.p>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="text-sm font-medium block">
              Contraseña
            </label>
            <Link to="/recover-password" className="text-sm text-primary hover:underline transition-colors">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="text-neutral/50" />
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password", { 
                required: "Contraseña es requerida",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres"
                }
              })}
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-secondary/70 backdrop-blur-sm border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="********"
            />
          </div>
          {errors.password && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-sm text-error mt-1 flex items-center"
            >
              <FiAlertCircle className="mr-1" size={14} />
              {errors.password.message}
            </motion.p>
          )}
        </div>
        
        <motion.button 
          type="submit" 
          disabled={loading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 btnPrimaryGradient rounded-lg flex items-center justify-center hover:btnPrimaryGradientHover disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
        >
          {loading ? (
            <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          ) : (
            <>
              <FiLogIn className="mr-2" /> Iniciar sesión
            </>
          )}
        </motion.button>
      </form>
      
      <div className="relative mt-8 pt-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-800"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-secondary px-4 text-sm text-neutral/60">¿Eres nuevo aquí?</span>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <Link 
          to="/register" 
          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Crear una nueva cuenta
        </Link>
      </div>
    </motion.div>
  );
};

export default Login;
