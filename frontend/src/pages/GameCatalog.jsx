import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiFilter, FiSearch } from 'react-icons/fi';

/**
 * Catálogo de juegos disponibles
 */
const GameCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Lista de juegos de ejemplo
  const gamesList = [
    { id: 1, name: 'Blackjack', category: 'Cartas', popularity: 'Alta' },
    { id: 2, name: 'Ruleta', category: 'Mesa', popularity: 'Alta' },
    { id: 3, name: 'Slot Machine', category: 'Tragamonedas', popularity: 'Media' },
    { id: 4, name: 'Poker', category: 'Cartas', popularity: 'Alta' },
    { id: 5, name: 'Baccarat', category: 'Mesa', popularity: 'Media' },
    { id: 6, name: 'Craps', category: 'Dados', popularity: 'Baja' },
    { id: 7, name: 'Video Poker', category: 'Video', popularity: 'Media' },
    { id: 8, name: 'Keno', category: 'Lotería', popularity: 'Baja' },
    { id: 9, name: 'Bingo', category: 'Lotería', popularity: 'Media' }
  ];
  
  // Filtrar juegos según término de búsqueda
  const filteredGames = gamesList.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="containerCustom mx-auto px-4 py-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold font-display mb-2">
          Catálogo de Juegos
        </h1>
        <p className="text-neutral/70">
          Explora nuestra variedad de juegos de casino
        </p>
      </motion.div>
      
      {/* Barra de búsqueda y filtros */}
      <motion.div
        className="flex flex-wrap gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="relative flex-1 min-w-[260px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-neutral/50" />
          </div>
          <input
            type="text"
            placeholder="Buscar juegos..."
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-secondary border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-gray-800 hover:bg-gray-800 transition-colors">
          <FiFilter /> Filtros
        </button>
      </motion.div>
      
      {/* Grid de juegos */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <Link 
              to={`/games/${game.id}`} 
              key={game.id}
              className="bg-secondary border border-gray-800 rounded-lg overflow-hidden hover:border-primary transition-colors"
            >
              <div className="aspect-video bg-primary/20"></div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg mb-1">{game.name}</h3>
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded">{game.category}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <span className="text-neutral/70 text-sm">Popularidad: {game.popularity}</span>
                  <span className="text-primary">Jugar ahora →</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-neutral/70">No se encontraron juegos con tu búsqueda</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default GameCatalog;
