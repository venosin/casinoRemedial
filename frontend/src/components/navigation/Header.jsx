import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiChevronDown, HiUser, HiLogout } from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';

/**
 * Componente Header principal con navegación responsiva
 * Incluye menú móvil, animaciones y estado de autenticación
 */
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  // Cerrar menú móvil cuando cambia la ruta
  useEffect(() => {
    setIsOpen(false);
    setProfileDropdown(false);
  }, [location.pathname]);

  // Detectar scroll para cambiar estilo de header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enlaces de navegación principal
  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Juegos', path: '/games' },
  ];

  // Enlaces para usuarios autenticados
  const authLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Perfil', path: '/profile' },
  ];

  // Enlaces para administradores
  const adminLinks = [
    { name: 'Panel Admin', path: '/admin' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-secondary shadow-md' : 'bg-secondary/80 backdrop-blur-md'
      }`}
    >
      <div className="container-custom mx-auto flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            className="text-2xl font-display font-bold text-gradient"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            CASINO REMEDIAL
          </motion.div>
        </Link>

        {/* Navegación de escritorio */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 mx-1 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-primary font-medium' 
                    : 'text-neutral/80 hover:text-primary'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          {/* Links adicionales según autenticación */}
          {isAuthenticated && authLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 mx-1 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-primary font-medium' 
                    : 'text-neutral/80 hover:text-primary'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          {/* Links de administrador - solo mostrar si el usuario es admin */}
          {isAuthenticated && user?.role === 'admin' && adminLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 mx-1 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-accent font-medium' 
                    : 'text-neutral/80 hover:text-accent'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Botones de acción según estado de autenticación */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-secondary hover:bg-neutral/10 transition-colors"
              >
                <span className="font-medium">{user?.fullName?.split(' ')[0] || 'Usuario'}</span>
                <HiChevronDown className={`transition-transform ${profileDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown perfil */}
              <AnimatePresence>
                {profileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 py-2 bg-secondary border border-gray-800 rounded-lg shadow-xl z-50"
                  >
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-neutral/80 hover:bg-neutral/10 hover:text-primary"
                    >
                      <HiUser className="mr-2" /> Mi Perfil
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-neutral/80 hover:bg-neutral/10 hover:text-error"
                    >
                      <HiLogout className="mr-2" /> Cerrar Sesión
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 text-neutral/80 hover:text-primary transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-lg bg-primary text-neutral font-medium hover:bg-primary/80 transition-colors"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Botón de menú móvil */}
        <button
          className="md:hidden text-neutral focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>

        {/* Menú móvil */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-secondary border-t border-gray-800 md:hidden z-50"
            >
              <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
                {/* Links de navegación */}
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `py-2 ${isActive ? 'text-primary font-medium' : 'text-neutral/80'}`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                
                {/* Links adicionales si está autenticado */}
                {isAuthenticated && authLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `py-2 ${isActive ? 'text-primary font-medium' : 'text-neutral/80'}`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                
                {/* Links de admin */}
                {isAuthenticated && user?.role === 'admin' && adminLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `py-2 ${isActive ? 'text-accent font-medium' : 'text-neutral/80'}`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                
                {/* Botones de acción móvil */}
                <div className="pt-4 mt-4 border-t border-gray-800 flex flex-col space-y-3">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-primary font-medium">
                          {user?.fullName || 'Usuario'}
                        </span>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center py-2 text-neutral/80"
                      >
                        <HiUser className="mr-2" /> Mi Perfil
                      </Link>
                      <button
                        onClick={() => logout()}
                        className="flex items-center py-2 text-neutral/80"
                      >
                        <HiLogout className="mr-2" /> Cerrar Sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="py-2 text-center text-neutral/80 hover:text-primary"
                      >
                        Iniciar Sesión
                      </Link>
                      <Link
                        to="/register"
                        className="py-2 rounded-lg bg-primary text-center text-neutral font-medium"
                      >
                        Registrarse
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
