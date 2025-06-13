import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiArrowLeft, FiPlay } from 'react-icons/fi';

/**
 * Página de detalles de un juego específico
 */
const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulación de carga de datos
  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      try {
        // Aquí se haría una llamada a la API real
        // Simulamos una respuesta con datos ficticios
        const mockGames = {
          '1': { 
            id: 1, 
            name: 'Blackjack', 
            description: 'Blackjack, también conocido como veintiuno, es un juego de cartas que consiste en obtener 21 puntos o acercarse a 21 sin pasarse.',
            rules: 'El objetivo del juego es conseguir una mano cuyo valor sea lo más cercano posible a 21 sin pasarse. Los ases valen 1 u 11, las figuras valen 10 y las demás cartas su valor nominal.',
            category: 'Cartas',
            minBet: 5,
            maxBet: 500,
            popularity: 'Alta',
            avgRating: 4.8,
            totalRatings: 124,
            imageUrl: ''
          },
          '2': { 
            id: 2, 
            name: 'Ruleta', 
            description: 'La ruleta es un juego de azar típico de los casinos, cuyo nombre proviene del término francés roulette, que significa "ruedita" o "rueda pequeña".',
            rules: 'El juego consiste en realizar apuestas al número, color o grupo de números donde caerá la bola al girar la ruleta. Existen múltiples modalidades de apuesta con diferentes probabilidades y pagos.',
            category: 'Mesa',
            minBet: 1,
            maxBet: 1000,
            popularity: 'Alta',
            avgRating: 4.6,
            totalRatings: 98,
            imageUrl: ''
          },
          // Más juegos...
        };
        
        // Simulamos un tiempo de carga
        setTimeout(() => {
          if (mockGames[id]) {
            setGame(mockGames[id]);
          } else {
            // Si no existe el juego, podríamos redirigir o mostrar un error
            console.error('Juego no encontrado');
          }
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error al cargar los datos del juego:', error);
        setLoading(false);
      }
    };
    
    fetchGame();
  }, [id]);

  if (loading) {
    return (
      <div className="containerCustom mx-auto px-4 py-16 flex justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="containerCustom mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Juego no encontrado</h2>
        <Link to="/games" className="text-primary hover:underline">
          Volver al catálogo de juegos
        </Link>
      </div>
    );
  }

  return (
    <div className="containerCustom mx-auto px-4 py-8">
      <Link to="/games" className="inline-flex items-center text-neutral/70 hover:text-primary mb-6">
        <FiArrowLeft className="mr-2" /> Volver al catálogo
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Imagen y detalles principales */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="aspect-video bg-primary/20 rounded-lg mb-6"></div>
          
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold font-display">{game.name}</h1>
            <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
              {game.category}
            </span>
          </div>
          
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar 
                  key={i} 
                  className={`${i < Math.floor(game.avgRating) ? 'text-accent fill-accent' : 'text-neutral/30'}`} 
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-neutral/70">
              ({game.avgRating}/5 - {game.totalRatings} valoraciones)
            </span>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Descripción</h2>
              <p className="text-neutral/70">{game.description}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-2">Reglas</h2>
              <p className="text-neutral/70">{game.rules}</p>
            </div>
          </div>
        </motion.div>
        
        {/* Panel de juego y apuestas */}
        <motion.div
          className="bg-secondary border border-gray-800 rounded-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-4">Información de juego</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-neutral/70">Apuesta mínima</span>
              <span className="font-medium">${game.minBet}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-neutral/70">Apuesta máxima</span>
              <span className="font-medium">${game.maxBet}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-neutral/70">Popularidad</span>
              <span className="font-medium">{game.popularity}</span>
            </div>
          </div>
          
          <button className="w-full py-3 btnPrimaryGradient rounded-lg flex items-center justify-center hover:btnPrimaryGradientHover">
            <FiPlay className="mr-2" /> Jugar ahora
          </button>
          
          <div className="text-center text-sm text-neutral/50 mt-6">
            Debes estar registrado para jugar con dinero real
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameDetails;
