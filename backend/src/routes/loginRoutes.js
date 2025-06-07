/**
 * @file loginRoutes.js
 * @description Rutas específicas para el inicio de sesión
 */

import express from "express";
const router = express.Router();

// Importar controlador
import { login } from "../controllers/loginController.js";

// Ruta para la raíz '/'
router
  .route("/")
  .post(login);  // POST /api/login - Iniciar sesión (público)

export default router;
