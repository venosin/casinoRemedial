import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiUserPlus, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

/**
 * Página de registro de nuevos usuarios
 */
const Register = () => {
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm();
  
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser(data.name, data.email, data.password);
      navigate('/auth/verificacion');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const password = watch('password');

  return (
    <motion.div 
      className="w-full max-w-md mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold font-display mb-2">Crear cuenta</h1>
        <p className="text-neutral/70">Únete a nuestra plataforma de casino</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium block">
            Nombre completo
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-neutral/50" />
            </div>
            <input
              id="name"
              type="text"
              {...register("name", { 
                required: "Nombre es requerido",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres"
                }
              })}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-secondary border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
          {errors.name && <p className="text-sm text-error mt-1">{errors.name.message}</p>}
        </div>
        
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
          <label htmlFor="password" className="text-sm font-medium block">
            Contraseña
          </label>
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
        
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium block">
            Confirmar contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="text-neutral/50" />
            </div>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", { 
                required: "Confirmación de contraseña es requerida",
                validate: value => value === password || "Las contraseñas no coinciden"
              })}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-secondary border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="********"
            />
          </div>
          {errors.confirmPassword && <p className="text-sm text-error mt-1">{errors.confirmPassword.message}</p>}
        </div>
        
        <div className="flex items-start">
          <input
            id="terms"
            type="checkbox"
            {...register("terms", { 
              required: "Debes aceptar los términos y condiciones"
            })}
            className="h-4 w-4 text-primary border-gray-700 rounded bg-secondary focus:ring-primary"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-neutral/80">
            Acepto los <Link to="/terminos" className="text-primary hover:underline">términos y condiciones</Link>
          </label>
          {errors.terms && <p className="text-sm text-error ml-2">{errors.terms.message}</p>}
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
              <FiUserPlus className="mr-2" /> Registrarme
            </>
          )}
        </button>
      </form>
      
      <p className="text-center mt-8">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/auth/login" className="text-primary hover:underline">
          Inicia sesión
        </Link>
      </p>
    </motion.div>
  );
};

export default Register;
