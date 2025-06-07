/**
 * @file gameRoutes.js
 * @description Rutas para la gestión de juegos del casino
 */

import express from "express";
const router = express.Router();

// Importar controladores
import { 
    createGame, 
    getAllGames, 
    getGameById,
    getGamesByCategory,
    updateGame, 
    toggleGameActive, 
    deleteGame 
} from '../controllers/gamesController.js';

// Importar middlewares
import { protect, admin } from '../middleware/authMiddleware.js';

// Rutas para la raíz '/'
router
  .route('/')
  .get(getAllGames)                     // GET /api/games - Obtener todos los juegos (público)
  .post(protect, admin, createGame);    // POST /api/games - Crear un nuevo juego (solo admin)

// Ruta para filtrar juegos por categoría (debe ir ANTES de las rutas con :id)
router
  .route('/category/:categoryName')
  .get(getGamesByCategory);             // GET /api/games/category/:categoryName - Filtrar juegos por categoría

// Rutas para '/:id'
router
  .route('/:id')
  .get(getGameById)                     // GET /api/games/:id - Obtener juego por ID (público)
  .put(protect, admin, updateGame)      // PUT /api/games/:id - Actualizar juego (solo admin)
  .delete(protect, admin, deleteGame);  // DELETE /api/games/:id - Eliminar juego (solo admin)

// Ruta para activar/desactivar juego
router
  .route('/:id/toggle-active')
  .patch(protect, admin, toggleGameActive);  // PATCH /api/games/:id/toggle-active - Activar/desactivar juego

export default router;
