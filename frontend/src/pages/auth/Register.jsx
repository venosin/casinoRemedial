import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiUserPlus, FiMail, FiLock, FiUser, FiAlertCircle, FiMapPin, FiCalendar } from 'react-icons/fi';
import { FaDiceD20 } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

/**
 * Página de registro de nuevos usuarios con manejo mejorado de errores
 * y validación de formulario
 */
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
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
    setAuthError(null);
    
    try {
      // Preparar los datos según el modelo del backend
      const userData = {
        fullName: data.name,
        email: data.email,
        password: data.password,
        age: parseInt(data.age, 10), // Convertir a entero para evitar problemas de tipo
        country: data.country
      };
      
      const success = await registerUser(userData);
      
      if (success) {
        // Redirigir a la página de verificación de email
        navigate('/verify-email');
        toast.success('Registro exitoso. Por favor verifica tu email.');
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
      setAuthError('Error al crear la cuenta. Verifica los datos ingresados.');
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
        <h1 className="text-3xl font-bold font-display mb-2 text-gradient">Crear cuenta</h1>
        <p className="text-neutral/70">Únete a nuestra plataforma de casino</p>
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
              autoComplete="name"
              placeholder="John Doe"
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-secondary/70 backdrop-blur-sm border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          {errors.name && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-sm text-error mt-1 flex items-center"
            >
              <FiAlertCircle className="mr-1" size={14} />
              {errors.name.message}
            </motion.p>
          )}
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
              autoComplete="email"
              placeholder="tu@email.com"
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-secondary/70 backdrop-blur-sm border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
              autoComplete="new-password"
              placeholder="********"
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-secondary/70 backdrop-blur-sm border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
              autoComplete="new-password"
              placeholder="********"
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-secondary/70 backdrop-blur-sm border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          {errors.confirmPassword && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-sm text-error mt-1 flex items-center"
            >
              <FiAlertCircle className="mr-1" size={14} />
              {errors.confirmPassword.message}
            </motion.p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="age" className="text-sm font-medium block">
            Edad
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiCalendar className="text-neutral/50" />
            </div>
            <input
              id="age"
              type="number"
              min="18"
              max="120"
              {...register("age", { 
                required: "La edad es requerida",
                min: {
                  value: 18,
                  message: "Debes tener al menos 18 años"
                },
                max: {
                  value: 120,
                  message: "La edad no puede ser mayor a 120 años"
                }
              })}
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-secondary/70 backdrop-blur-sm border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Edad"
            />
          </div>
          {errors.age && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-sm text-error mt-1 flex items-center"
            >
              <FiAlertCircle className="mr-1" size={14} />
              {errors.age.message}
            </motion.p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="country" className="text-sm font-medium block">
            País
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMapPin className="text-neutral/50" />
            </div>
            <select
              id="country"
              {...register("country", { 
                required: "El país es requerido"
              })}
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-secondary/70 backdrop-blur-sm border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent appearance-none transition-all"
            >
            <option value="">Selecciona tu país</option>
            <option value="Argentina">Argentina</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Chile">Chile</option>
            <option value="Colombia">Colombia</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cuba">Cuba</option>
            <option value="Ecuador">Ecuador</option>
            <option value="El Salvador">El Salvador</option>
            <option value="España">España</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Honduras">Honduras</option>
            <option value="México">México</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Panamá">Panamá</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Perú">Perú</option>
            <option value="República Dominicana">República Dominicana</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Venezuela">Venezuela</option>
            </select>
          </div>
          {errors.country && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-sm text-error mt-1 flex items-center"
            >
              <FiAlertCircle className="mr-1" size={14} />
              {errors.country.message}
            </motion.p>
          )}
        </div>
        
        <div className="flex items-start mt-4">
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
          {errors.terms && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-sm text-error ml-6 mt-1 flex items-center"
            >
              <FiAlertCircle className="mr-1" size={14} />
              {errors.terms.message}
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
              <FiUserPlus className="mr-2" /> Registrarme
            </>
          )}
        </motion.button>
      </form>
      
      <div className="relative mt-8 pt-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-800"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-secondary px-4 text-sm text-neutral/60">¿Ya tienes una cuenta?</span>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <Link 
          to="/login" 
          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Iniciar sesión
        </Link>
      </div>
    </motion.div>
  );
};

export default Register;
