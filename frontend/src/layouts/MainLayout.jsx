import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';

/**
 * Layout principal de la aplicación que incluye:
 * - Header con navegación principal
 * - Contenido principal (renderizado mediante Outlet)
 * - Footer con enlaces y copyright
 */
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header fijo en la parte superior */}
      <Header />
      
      {/* Contenido principal con animación de entrada */}
      <motion.main 
        className="flex-grow pt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      
      {/* Footer en la parte inferior */}
      <Footer />
    </div>
  );
};

export default MainLayout;
