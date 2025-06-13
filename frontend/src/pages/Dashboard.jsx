import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiPlay, FiUser, FiCreditCard, FiAward } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

/**
 * Dashboard del usuario con resumen de cuenta y accesos rápidos
 */
const Dashboard = () => {
  const { user } = useAuth();
  
  // Datos ficticios para la demostración
  const userStats = {
    balance: 1500,
    gamesPlayed: 24,
    winRate: '65%',
    favGame: 'Blackjack'
  };
  
  return (
    <div className="containerCustom mx-auto px-4 py-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold font-display mb-2">
          ¡Bienvenido, {user?.name || 'Jugador'}!
        </h1>
        <p className="text-neutral/70">
          Administra tu cuenta y disfruta de nuestros juegos
        </p>
      </motion.div>
      
      {/* Estadísticas del usuario */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div 
          className="bg-secondary p-4 rounded-lg border border-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-neutral/70 font-medium">Balance</h3>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <FiCreditCard className="text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold">${userStats.balance}</p>
          <Link to="/depositar" className="text-primary text-sm hover:underline">
            Depositar fondos →
          </Link>
        </motion.div>
        
        <motion.div 
          className="bg-secondary p-4 rounded-lg border border-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-neutral/70 font-medium">Partidas jugadas</h3>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <FiPlay className="text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold">{userStats.gamesPlayed}</p>
          <span className="text-neutral/70 text-sm">
            Esta semana
          </span>
        </motion.div>
        
        <motion.div 
          className="bg-secondary p-4 rounded-lg border border-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-neutral/70 font-medium">Tasa de victoria</h3>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <FiAward className="text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold">{userStats.winRate}</p>
          <span className="text-neutral/70 text-sm">
            Últimas 20 partidas
          </span>
        </motion.div>
        
        <motion.div 
          className="bg-secondary p-4 rounded-lg border border-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-neutral/70 font-medium">Juego favorito</h3>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <FiUser className="text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold">{userStats.favGame}</p>
          <Link to={`/games/${userStats.favGame.toLowerCase()}`} className="text-primary text-sm hover:underline">
            Jugar ahora →
          </Link>
        </motion.div>
      </div>
      
      {/* Juegos recomendados */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold font-display mb-4">
          Juegos recomendados para ti
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-secondary border border-gray-800 rounded-lg overflow-hidden">
            <div className="h-40 bg-primary/20"></div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">Ruleta VIP</h3>
              <p className="text-neutral/70 text-sm mb-3">Apuesta entre $50 y $10,000 por ronda</p>
              <Link to="/games/roulette-vip" className="btnPrimaryGradient px-4 py-2 rounded inline-block text-sm hover:btnPrimaryGradientHover">
                Jugar ahora
              </Link>
            </div>
          </div>
          
          <div className="bg-secondary border border-gray-800 rounded-lg overflow-hidden">
            <div className="h-40 bg-primary/20"></div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">Blackjack Pro</h3>
              <p className="text-neutral/70 text-sm mb-3">Mesa con 8 barajas y apuestas altas</p>
              <Link to="/games/blackjack-pro" className="btnPrimaryGradient px-4 py-2 rounded inline-block text-sm hover:btnPrimaryGradientHover">
                Jugar ahora
              </Link>
            </div>
          </div>
          
          <div className="bg-secondary border border-gray-800 rounded-lg overflow-hidden">
            <div className="h-40 bg-primary/20"></div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">Diamond Slots</h3>
              <p className="text-neutral/70 text-sm mb-3">Tragamonedas con jackpot progresivo</p>
              <Link to="/games/diamond-slots" className="btnPrimaryGradient px-4 py-2 rounded inline-block text-sm hover:btnPrimaryGradientHover">
                Jugar ahora
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Historial reciente */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold font-display mb-4">
          Historial reciente
        </h2>
        
        <div className="bg-secondary border border-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-4 py-3 text-left">Juego</th>
                  <th className="px-4 py-3 text-left">Fecha</th>
                  <th className="px-4 py-3 text-left">Apuesta</th>
                  <th className="px-4 py-3 text-left">Ganancia</th>
                  <th className="px-4 py-3 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">Blackjack</td>
                  <td className="px-4 py-3">12/06/2025</td>
                  <td className="px-4 py-3">$100</td>
                  <td className="px-4 py-3">$150</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-success/20 text-success rounded text-xs">Ganado</span></td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">Ruleta</td>
                  <td className="px-4 py-3">11/06/2025</td>
                  <td className="px-4 py-3">$50</td>
                  <td className="px-4 py-3">$0</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-error/20 text-error rounded text-xs">Perdido</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Slots</td>
                  <td className="px-4 py-3">10/06/2025</td>
                  <td className="px-4 py-3">$25</td>
                  <td className="px-4 py-3">$75</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-success/20 text-success rounded text-xs">Ganado</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 text-center">
            <Link to="/historial" className="text-primary hover:underline">Ver historial completo →</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
