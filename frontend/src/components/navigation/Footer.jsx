import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt 
} from 'react-icons/fa';

/**
 * Componente Footer con enlaces, información de contacto y redes sociales
 * Incluye animaciones y diseño responsivo
 */
const Footer = () => {
  // Enlaces de navegación principal
  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Juegos', path: '/games' },
    { name: 'Sobre Nosotros', path: '/about' },
    { name: 'Contacto', path: '/contact' },
  ];

  // Enlaces legales y políticas
  const legalLinks = [
    { name: 'Términos y Condiciones', path: '/terms' },
    { name: 'Política de Privacidad', path: '/privacy' },
    { name: 'Juego Responsable', path: '/responsible-gaming' },
  ];

  // Información de contacto
  const contactInfo = [
    { icon: <FaEnvelope />, text: 'info@casinoremedial.com' },
    { icon: <FaPhone />, text: '(+123) 456-7890' },
    { icon: <FaMapMarkerAlt />, text: 'Av. Principal #123, Ciudad' },
  ];

  // Redes sociales
  const socialLinks = [
    { icon: <FaFacebookF />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <footer className="bg-secondary pt-12 pb-6">
      <div className="container-custom mx-auto">
        {/* Contenido principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <motion.h2 
                className="text-3xl font-display font-bold text-gradient"
                whileHover={{ scale: 1.05 }}
              >
                CASINO REMEDIAL
              </motion.h2>
            </Link>
            <p className="text-neutral/70">
              Disfruta de la mejor experiencia de juegos de casino en línea con Casino Remedial. 
              Juega con responsabilidad y diviértete al máximo.
            </p>

            {/* Redes sociales */}
            <div className="flex space-x-3 mt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-neutral/10 hover:bg-primary text-neutral/80 hover:text-neutral w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  whileHover={{ y: -3 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4 text-neutral">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={index} 
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-neutral/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Información legal */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4 text-neutral">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <motion.li 
                  key={index} 
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-neutral/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4 text-neutral">Contacto</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-center text-neutral/70">
                  <span className="text-primary mr-3">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Separador */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <p className="text-neutral/50 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Casino Remedial. Todos los derechos reservados.
            </p>
            
            {/* Aviso de juego responsable */}
            <div className="flex items-center">
              <span className="text-xs text-neutral/50 text-center">
                +18. Juega con responsabilidad. Si sientes que tienes un problema, busca ayuda profesional.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
