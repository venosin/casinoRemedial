import { Link, useLocation } from 'react-router-dom';
import { HiChevronRight, HiHome } from 'react-icons/hi';

/**
 * Componente de breadcrumbs (migas de pan) para mostrar la ubicación actual del usuario
 * en la jerarquía de navegación y permitir retroceder fácilmente
 */
const Breadcrumbs = () => {
  const location = useLocation();
  
  // Ignorar en páginas principales
  if (location.pathname === '/') {
    return null;
  }
  
  // Obtener las rutas a partir del pathname
  const paths = location.pathname.split('/').filter(path => path);
  
  // Mapear rutas a objetos con label y path
  const breadcrumbs = paths.map((path, index) => {
    // Construir el path acumulativo
    const url = `/${paths.slice(0, index + 1).join('/')}`;
    
    // Formatear el nombre para mostrar (capitalizar y reemplazar guiones)
    let label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    
    // Casos especiales
    switch (path) {
      case 'games':
        label = 'Juegos';
        break;
      case 'admin':
        label = 'Panel Admin';
        break;
      case 'profile':
        label = 'Perfil';
        break;
      case 'dashboard':
        label = 'Dashboard';
        break;
      case 'login':
        label = 'Iniciar Sesión';
        break;
      case 'register':
        label = 'Registrarse';
        break;
      case 'verify-email':
        label = 'Verificar Email';
        break;
      case 'users':
        label = 'Usuarios';
        break;
      case 'transactions':
        label = 'Transacciones';
        break;
      case 'settings':
        label = 'Configuración';
        break;
      case 'reports':
        label = 'Reportes';
        break;
      default:
        // Si es un ID, no cambiar el formato
        if (path.length >= 20) {
          label = 'Detalle';
        }
    }
    
    return { label, path: url };
  });
  
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 mb-6">
      <ol className="flex flex-wrap items-center space-x-1 md:space-x-2 text-sm md:text-base">
        {/* Inicio siempre presente */}
        <li>
          <Link 
            to="/" 
            className="flex items-center text-neutral/70 hover:text-primary transition-colors"
          >
            <HiHome className="mr-1" />
            <span>Inicio</span>
          </Link>
        </li>
        
        {/* Separador después de inicio */}
        <li className="text-neutral/50">
          <HiChevronRight />
        </li>
        
        {/* Resto de rutas */}
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {/* Si es el último elemento, mostrar como texto */}
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium text-primary">{crumb.label}</span>
            ) : (
              <>
                <Link 
                  to={crumb.path} 
                  className="text-neutral/70 hover:text-primary transition-colors"
                >
                  {crumb.label}
                </Link>
                {/* Separador excepto para el último */}
                <span className="mx-1 md:mx-2 text-neutral/50">
                  <HiChevronRight />
                </span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
