import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

/**
 * Página de recuperación de contraseña
 */
const PasswordRecovery = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { requestPasswordReset } = useAuth();
  
  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm();
  
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await requestPasswordReset(data.email);
      setEmailSent(true);
      toast.success('Se ha enviado un correo para recuperar tu contraseña');
    } catch (error) {
      console.error(error);
      toast.error('No se pudo enviar el correo de recuperación');
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
        <h1 className="text-3xl font-bold font-display mb-2">Recuperar contraseña</h1>
        <p className="text-neutral/70">Te enviaremos un enlace para restablecer tu contraseña</p>
      </div>
      
      {emailSent ? (
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
            <FiMail className="text-success text-2xl" />
          </div>
          
          <h2 className="text-xl font-bold">Correo enviado</h2>
          <p className="text-neutral/70">
            Hemos enviado un correo electrónico con instrucciones para restablecer tu contraseña.
            Por favor revisa tu bandeja de entrada.
          </p>
          
          <div className="pt-4">
            <Link to="/login" className="text-primary hover:underline flex items-center justify-center">
              <FiArrowLeft className="mr-2" /> Volver a inicio de sesión
            </Link>
          </div>
        </div>
      ) : (
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
              'Enviar instrucciones'
            )}
          </motion.button>
          
          <div className="mt-8 text-center">
            <Link to="/login" className="text-primary hover:underline flex items-center justify-center">
              <FiArrowLeft className="mr-2" /> Volver a inicio de sesión
            </Link>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default PasswordRecovery;
