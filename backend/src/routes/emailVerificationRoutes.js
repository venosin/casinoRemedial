/**
 * @file emailVerificationRoutes.js
 * @description Rutas para la verificación de email de usuarios
 */

import express from "express";
const router = express.Router();

// Importar controladores
import {
    sendVerificationEmail,
    verifyEmail,
    resendVerificationEmail
} from "../controllers/emailVerificationController.js";

// Ruta para enviar correo de verificación
router
  .route("/send")
  .post(sendVerificationEmail);  // POST /api/verify-email/send - Enviar correo de verificación

// Ruta para verificar el código
router
  .route("/verify")
  .post(verifyEmail);  // POST /api/verify-email/verify - Verificar código enviado

// Ruta para reenviar correo de verificación
router
  .route("/resend")
  .post(resendVerificationEmail);  // POST /api/verify-email/resend - Reenviar correo de verificación

export default router;
