import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FiMail, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

/**
 * Página para verificar el correo electrónico
 * Puede ser usada tanto para mostrar instrucciones como para procesar el token
 */
const EmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const { verifyEmail, resendVerificationEmail } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  
  // Si hay un token en la URL, verificamos automáticamente
  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        setLoading(true);
        try {
          await verifyEmail(token);
          setVerificationComplete(true);
          toast.success('Tu correo ha sido verificado correctamente');
          // Redirigir al login después de 3 segundos
          setTimeout(() => {
            navigate('/auth/login');
          }, 3000);
        } catch (error) {
          console.error(error);
          toast.error('El token de verificación es inválido o ha expirado');
        } finally {
          setLoading(false);
        }
      };
      
      verifyToken();
    }
  }, [token, verifyEmail, navigate]);
  
  const handleResend = async () => {
    setLoading(true);
    try {
      await resendVerificationEmail();
      toast.success('Hemos enviado un nuevo correo de verificación');
    } catch (error) {
      console.error(error);
      toast.error('No se pudo reenviar el correo de verificación');
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
        <h1 className="text-3xl font-bold font-display mb-2">
          {token ? 'Verificando correo' : 'Verificación de correo'}
        </h1>
        <p className="text-neutral/70">
          {token ? 'Procesando tu solicitud...' : 'Revisa tu bandeja de entrada para verificar tu cuenta'}
        </p>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Procesando tu solicitud...</p>
        </div>
      ) : verificationComplete ? (
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
            <FiCheckCircle className="text-success text-2xl" />
          </div>
          
          <h2 className="text-xl font-bold">¡Verificación completada!</h2>
          <p className="text-neutral/70">
            Tu dirección de correo electrónico ha sido verificada exitosamente.
            Serás redirigido automáticamente a la página de inicio de sesión.
          </p>
          
          <div className="pt-4">
            <Link to="/auth/login" className="btnPrimaryGradient px-6 py-2 rounded-lg inline-block">
              Ir a iniciar sesión
            </Link>
          </div>
        </div>
      ) : !token ? (
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <FiMail className="text-primary text-2xl" />
          </div>
          
          <div className="space-y-4">
            <p className="text-neutral/80">
              Hemos enviado un correo electrónico con un enlace de verificación a tu dirección de correo.
              Por favor revisa tu bandeja de entrada y sigue las instrucciones.
            </p>
            
            <p className="text-neutral/80">
              Si no recibes el correo en unos minutos, revisa tu carpeta de spam o solicita un nuevo correo de verificación.
            </p>
          </div>
          
          <div className="pt-4 space-y-3">
            <button
              onClick={handleResend}
              disabled={loading}
              className="w-full py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
            >
              Reenviar correo de verificación
            </button>
            
            <Link to="/auth/login" className="text-primary hover:underline flex items-center justify-center mt-4">
              <FiArrowLeft className="mr-2" /> Volver a inicio de sesión
            </Link>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
};

export default EmailVerification;
