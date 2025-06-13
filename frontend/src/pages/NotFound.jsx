import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

/**
 * Página de error 404 - No encontrado
 */
const NotFound = () => {
  return (
    <div className="containerCustom mx-auto px-4 py-16 h-[70vh] flex flex-col justify-center items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md"
      >
        <h1 className="text-primary text-7xl font-bold font-display mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-bold mb-4">
          Página no encontrada
        </h2>
        
        <p className="text-neutral/70 mb-8">
          La página que estás buscando no existe o ha sido movida.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/"
            className="btnPrimaryGradient px-6 py-3 rounded-lg flex items-center justify-center hover:btnPrimaryGradientHover"
          >
            <FiHome className="mr-2" /> Volver al inicio
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-lg border border-gray-700 flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Volver atrás
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
