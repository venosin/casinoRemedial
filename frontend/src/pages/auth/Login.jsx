import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

/**
 * Página de inicio de sesión
 */
const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm();
  
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
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
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold font-display mb-2">Bienvenido de nuevo</h1>
        <p className="text-neutral/70">Ingresa a tu cuenta para continuar</p>
      </div>
      
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
              {...register("email", { 
                required: "Email es requerido",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de email inválido"
                }
              })}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-secondary border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="tu@email.com"
            />
          </div>
          {errors.email && <p className="text-sm text-error mt-1">{errors.email.message}</p>}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="text-sm font-medium block">
              Contraseña
            </label>
            <Link to="/auth/recuperar-password" className="text-sm text-primary hover:underline">
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
              {...register("password", { 
                required: "Contraseña es requerida",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres"
                }
              })}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-secondary border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="********"
            />
          </div>
          {errors.password && <p className="text-sm text-error mt-1">{errors.password.message}</p>}
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 btnPrimaryGradient rounded-lg flex items-center justify-center hover:btnPrimaryGradientHover disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="animate-spin">◌</span>
          ) : (
            <>
              <FiLogIn className="mr-2" /> Iniciar sesión
            </>
          )}
        </button>
      </form>
      
      <p className="text-center mt-8">
        ¿No tienes una cuenta?{" "}
        <Link to="/auth/register" className="text-primary hover:underline">
          Regístrate
        </Link>
      </p>
    </motion.div>
  );
};

export default Login;
