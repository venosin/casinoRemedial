/**
 * @file authMiddleware.js
 * @description Middleware de autenticación con verificación de cuentas
 */

import jwt from 'jsonwebtoken';
import Client from '../models/Clients.js';
import dotenv from 'dotenv';
import config from '../config.js';

// Configura las variables de entorno
dotenv.config();

/**
 * Middleware para proteger rutas - verifica el token JWT
 * @desc    Verifica si el usuario está autenticado mediante un token válido
 * @param   {Object} req - Objeto de solicitud Express
 * @param   {Object} res - Objeto de respuesta Express
 * @param   {Function} next - Función next de Express
 */
export const protect = async (req, res, next) => {
    let token;

    // Verificar si el token está en los headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token del header (Bearer TOKEN)
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token
            const decoded = jwt.verify(token, config.auth.jwtSecret);

            // Obtener el usuario del token (sin incluir la contraseña)
            req.user = await Client.findById(decoded.id).select('-password');

            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'No autorizado, usuario no encontrado'
                });
                return;
            }
            
            // Guardar la información de verificación en req para otros middlewares
            req.isUserVerified = req.user.isVerified;

            next();
        } catch (error) {
            console.error('Error al verificar token:', error);
            res.status(401).json({
                success: false,
                message: 'No autorizado, token inválido o expirado'
            });
        }
    } else {
        res.status(401).json({
            success: false,
            message: 'No autorizado, no se proporcionó token'
        });
    }
};

/**
 * Middleware para verificar si la cuenta del usuario está verificada
 * @desc    Comprueba si el usuario ha verificado su correo electrónico
 * @param   {Object} req - Objeto de solicitud Express
 * @param   {Object} res - Objeto de respuesta Express
 * @param   {Function} next - Función next de Express
 */
export const requireVerified = (req, res, next) => {
    // Verificar si el usuario existe y está verificado
    if (req.user && req.user.isVerified) {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Cuenta no verificada. Por favor, verifica tu correo electrónico para continuar.'
        });
    }
};

/**
 * Middleware para verificar si el usuario es administrador
 * @desc    Verifica si el usuario tiene privilegios de administrador
 * @param   {Object} req - Objeto de solicitud Express
 * @param   {Object} res - Objeto de respuesta Express
 * @param   {Function} next - Función next de Express
 */
export const admin = (req, res, next) => {
    // Verificar si el usuario existe y es administrador
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'No autorizado como administrador'
        });
    }
};

/**
 * Middleware para verificar si el usuario es propietario del recurso
 * @desc    Verifica si el usuario es el propietario del recurso o es administrador
 * @param   {Object} req - Objeto de solicitud Express
 * @param   {Object} res - Objeto de respuesta Express
 * @param   {Function} next - Función next de Express
 */
export const checkOwnership = (req, res, next) => {
    // Si el usuario es administrador o es el dueño del recurso (comparando IDs)
    if (req.user.isAdmin || req.user._id.toString() === req.params.id) {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'No autorizado para acceder a este recurso'
        });
    }
};
