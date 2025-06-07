/**
 * @file logoutRoutes.js
 * @description Rutas específicas para el cierre de sesión y verificación de estado de autenticación
 */

import express from "express";
const router = express.Router();

// Importar controladores
import { logout, checkAuthStatus } from "../controllers/logoutController.js";

// Importar middlewares
import { protect } from "../middleware/authMiddleware.js";

// Ruta para la raíz '/'
router
  .route("/")
  .post(protect, logout);  // POST /api/logout - Cerrar sesión (requiere autenticación)

// Ruta para verificar estado de autenticación
router
  .route("/status")
  .get(protect, checkAuthStatus);  // GET /api/logout/status - Verificar si el usuario está autenticado

export default router;
