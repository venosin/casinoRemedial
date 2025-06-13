import { motion } from 'framer-motion';

/**
 * Componente de spinner de carga animado
 * Muestra una animación mientras se cargan datos o componentes
 */
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100/80 z-50">
      <motion.div
        className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
