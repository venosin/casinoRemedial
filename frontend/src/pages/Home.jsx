import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Página de inicio con presentación del casino
 */
const Home = () => {
  return (
    <div className="containerCustom mx-auto">
      <motion.section 
        className="min-h-[70vh] flex flex-col items-center justify-center py-10 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-6xl font-display font-bold textGradient mb-6 text-center">
          CASINO REMEDIAL
        </h1>
        <p className="text-xl text-neutral/80 text-center max-w-2xl mb-8">
          Bienvenido a la mejor experiencia de casino en línea. 
          Juega, diviértete y gana increíbles premios.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/games" className="btnPrimaryGradient px-8 py-3 rounded-lg text-lg hover:btnPrimaryGradientHover">
            Explorar Juegos
          </Link>
          <Link to="/register" className="px-8 py-3 rounded-lg text-lg border border-primary text-primary hover:bg-primary/10 transition-colors">
            Registrarse
          </Link>
        </div>
      </motion.section>
      
      <section className="py-16 px-4">
        <h2 className="text-3xl font-display font-bold mb-10 text-center">
          Nuestros Juegos Destacados
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Aquí irían los juegos destacados */}
          <div className="bg-secondary border border-gray-800 rounded-lg p-4">
            <div className="aspect-video bg-primary/20 rounded-md mb-4"></div>
            <h3 className="text-xl font-bold mb-2">Slot Machine</h3>
            <p className="text-neutral/70 mb-4">Prueba tu suerte en nuestras máquinas tragamonedas</p>
            <Link to="/games/slot" className="text-primary hover:underline">Jugar ahora →</Link>
          </div>
          
          <div className="bg-secondary border border-gray-800 rounded-lg p-4">
            <div className="aspect-video bg-primary/20 rounded-md mb-4"></div>
            <h3 className="text-xl font-bold mb-2">Blackjack</h3>
            <p className="text-neutral/70 mb-4">El clásico juego de cartas con reglas modernas</p>
            <Link to="/games/blackjack" className="text-primary hover:underline">Jugar ahora →</Link>
          </div>
          
          <div className="bg-secondary border border-gray-800 rounded-lg p-4">
            <div className="aspect-video bg-primary/20 rounded-md mb-4"></div>
            <h3 className="text-xl font-bold mb-2">Ruleta</h3>
            <p className="text-neutral/70 mb-4">Gira la rueda y prueba tu estrategia</p>
            <Link to="/games/roulette" className="text-primary hover:underline">Jugar ahora →</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
