/**
 * @file passwordRecoveryRoutes.js
 * @description Rutas para la recuperación de contraseña de usuarios
 */

import express from "express";
const router = express.Router();

// Importar controladores
import {
    requestPasswordRecovery,
    verifyRecoveryCode,
    resetPassword
} from "../controllers/passwordRecoveryController.js";

// Ruta para solicitar recuperación de contraseña
router
  .route("/request")
  .post(requestPasswordRecovery);  // POST /api/recover-password/request - Solicitar recuperación

// Ruta para verificar el código de recuperación
router
  .route("/verify-code")
  .post(verifyRecoveryCode);  // POST /api/recover-password/verify-code - Verificar código

// Ruta para restablecer la contraseña
router
  .route("/reset")
  .post(resetPassword);  // POST /api/recover-password/reset - Cambiar contraseña

export default router;
