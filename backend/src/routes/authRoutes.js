/**
 * @file authRoutes.js
 * @description Rutas para la autenticación de usuarios (login y logout)
 */

import { Router } from 'express';
import { login } from '../controllers/loginController.js';
import { logout, checkAuthStatus } from '../controllers/logoutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Rutas públicas (no requieren autenticación)
router.post('/login', login);

// Rutas protegidas (requieren autenticación)
router.post('/logout', protect, logout);
router.get('/status', protect, checkAuthStatus);

export default router;
