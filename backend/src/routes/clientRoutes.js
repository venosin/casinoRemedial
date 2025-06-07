/**
 * @file clientRoutes.js
 * @description Rutas para la gestión de clientes
 */

import express from "express";
const router = express.Router();

// Importar controladores
import {
  getAllClients,
  getClientById,
  registerClient,
  updateClient,
  updatePassword,
  deleteClient
} from "../controllers/clientsController.js";

// Importar middlewares
import { protect, admin, checkOwnership } from "../middleware/authMiddleware.js";

// Rutas para la raíz '/'
router
  .route('/')
  .get(protect, admin, getAllClients)     // GET /api/clients - Obtener todos los clientes (admin)
  .post(registerClient);                  // POST /api/clients - Registrar un nuevo cliente (público)

// Rutas para '/:id'
router
  .route('/:id')
  .get(protect, checkOwnership, getClientById)    // GET /api/clients/:id - Obtener cliente por ID
  .put(protect, checkOwnership, updateClient)     // PUT /api/clients/:id - Actualizar cliente
  .delete(protect, checkOwnership, deleteClient); // DELETE /api/clients/:id - Eliminar cliente

// Ruta para actualización de contraseña
router
  .route('/:id/password')
  .put(protect, checkOwnership, updatePassword);  // PUT /api/clients/:id/password - Actualizar contraseña

export default router;
