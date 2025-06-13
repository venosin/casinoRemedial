import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminSidebar from '../components/navigation/AdminSidebar';
import Breadcrumbs from '../components/navigation/Breadcrumbs';

/**
 * Layout para el área de administración con:
 * - Menú lateral con navegación admin
 * - Breadcrumbs para mejorar la navegación
 * - Diseño dashboard profesional
 * - Acceso a gestión de juegos y usuarios
 */
const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-secondary text-neutral">
      {/* Usamos nuestro componente AdminSidebar */}
      <AdminSidebar />
      
      {/* Área de contenido */}
      <div className="flex-1 flex flex-col ml-[80px] lg:ml-[260px] transition-all duration-300">
        {/* Barra superior con breadcrumbs */}
        <header className="bg-base-100 border-b border-gray-800">
          <Breadcrumbs />
        </header>
        
        {/* Contenido principal */}
        <motion.main 
          className="flex-1 p-6 bg-secondary overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;
