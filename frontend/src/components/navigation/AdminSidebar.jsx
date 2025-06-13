import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { 
  HiChevronRight, 
  HiHome, 
  HiUsers, 
  HiPuzzle, 
  HiCurrencyDollar, 
  HiDocumentReport, 
  HiCog, 
  HiLogout,
  HiChartPie,
  HiMenuAlt2,
  HiX
} from 'react-icons/hi';

/**
 * Sidebar de navegación para el panel de administración
 * Incluye enlaces a todas las secciones del panel administrativo
 */
const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();

  // Secciones del panel de administración
  const adminNavItems = [
    {
      name: 'Dashboard',
      icon: <HiChartPie className="text-xl" />,
      path: '/admin',
      exact: true
    },
    {
      name: 'Usuarios',
      icon: <HiUsers className="text-xl" />,
      path: '/admin/users'
    },
    {
      name: 'Juegos',
      icon: <HiPuzzle className="text-xl" />,
      path: '/admin/games'
    },
    {
      name: 'Transacciones',
      icon: <HiCurrencyDollar className="text-xl" />,
      path: '/admin/transactions'
    },
    {
      name: 'Reportes',
      icon: <HiDocumentReport className="text-xl" />,
      path: '/admin/reports'
    },
    {
      name: 'Configuración',
      icon: <HiCog className="text-xl" />,
      path: '/admin/settings'
    },
    {
      name: 'Ir al sitio',
      icon: <HiHome className="text-xl" />,
      path: '/',
      dividerTop: true
    }
  ];

  // Variantes para animaciones
  const sidebarVariants = {
    expanded: { width: '260px' },
    collapsed: { width: '80px' }
  };

  // Función para determinar si un enlace está activo
  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    if (path !== '/admin' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <>
      {/* Botón de menú para móvil */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)} 
          className="p-2 rounded-lg bg-secondary text-primary shadow-lg"
        >
          {isMobileOpen ? <HiX size={24} /> : <HiMenuAlt2 size={24} />}
        </button>
      </div>

      {/* Overlay para móvil */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 h-full bg-secondary border-r border-gray-800 shadow-xl z-40 overflow-hidden
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} transition-transform duration-300 lg:transition-none`}
        variants={sidebarVariants}
        initial="expanded"
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        transition={{ duration: 0.3 }}
      >
        {/* Header del sidebar */}
        <div className={`h-20 flex items-center justify-between px-4 border-b border-gray-800`}>
          {!isCollapsed && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl font-display font-bold text-gradient"
            >
              Panel Admin
            </motion.h1>
          )}
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full hover:bg-neutral/10"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <HiChevronRight className="text-neutral/80" />
            </motion.div>
          </button>
        </div>
        
        {/* Navegación */}
        <nav className="py-6">
          <ul className="space-y-1 px-3">
            {adminNavItems.map((item, index) => (
              <li key={index}>
                {item.dividerTop && <div className="border-t border-gray-800 my-4"></div>}
                <NavLink
                  to={item.path}
                  end={item.exact}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center rounded-lg px-3 py-2.5 mb-1 transition-all
                    ${isActive(item.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-neutral/80 hover:bg-neutral/10 hover:text-primary'
                    }
                  `}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="ml-3 font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </NavLink>
              </li>
            ))}

            {/* Botón de cerrar sesión */}
            <li className="mt-8">
              <button
                onClick={logout}
                className={`w-full flex items-center rounded-lg px-3 py-2.5 text-neutral/80 hover:bg-error/10 hover:text-error transition-all`}
              >
                <span className="flex-shrink-0">
                  <HiLogout className="text-xl" />
                </span>
                
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="ml-3 font-medium"
                  >
                    Cerrar Sesión
                  </motion.span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;
