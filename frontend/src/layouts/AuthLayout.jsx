import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Layout para páginas de autenticación con:
 * - Diseño minimalista centrado en formularios
 * - Logo y navegación mínima
 * - Efectos visuales de casino en el fondo
 */
const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-casino-pattern opacity-10 z-0"></div>
      
      {/* Efecto de luces de neón */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary rounded-full blur-[100px] opacity-20 animate-pulse z-0"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent rounded-full blur-[100px] opacity-20 animate-pulse z-0"></div>
      
      {/* Barra superior con logo */}
      <div className="py-4 px-6 flex justify-between items-center relative z-10">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold text-gradient">CASINO REMEDIAL</span>
        </Link>
        <Link to="/" className="text-sm text-neutral/70 hover:text-primary transition-colors">
          Volver al inicio
        </Link>
      </div>
      
      {/* Contenido principal */}
      <motion.div 
        className="flex-1 flex justify-center items-center px-4 relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </motion.div>
      
      {/* Pie de página simple */}
      <div className="py-4 text-center text-xs text-neutral/50 relative z-10">
        © {new Date().getFullYear()} Casino Remedial. Todos los derechos reservados.
      </div>
    </div>
  );
};

export default AuthLayout;
