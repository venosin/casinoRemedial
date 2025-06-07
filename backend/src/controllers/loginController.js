/**
 * @file loginController.js
 * @description Controlador para manejar el inicio de sesión de usuarios
 */

import Client from '../models/Clients.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';

/**
 * Genera un token JWT para el usuario autenticado
 * @param {string} id - ID del usuario
 * @returns {string} Token JWT generado
 */
const generateToken = (id) => {
    return jwt.sign({ id }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn, // Tiempo de expiración del token
    });
};

/**
 * @desc    Iniciar sesión de cliente y generar token JWT
 * @route   POST /api/auth/login
 * @access  Public
 * @param   {Object} req - Objeto de solicitud Express
 * @param   {Object} res - Objeto de respuesta Express
 */
export const login = async (req, res) => {
    try {
        // Extraer credenciales del cuerpo de la solicitud
        const { email, password } = req.body;
        
        // Validar que se hayan proporcionado ambos campos
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Por favor ingrese email y contraseña'
            });
        }
        
        // Buscar el cliente por email (case insensitive)
        const client = await Client.findOne({ 
            email: { $regex: new RegExp(`^${email}$`, 'i') } 
        });
        
        // Si el cliente no existe
        if (!client) {
            return res.status(401).json({ 
                success: false, 
                message: 'Credenciales inválidas' 
            });
        }
        
        // Verificar la contraseña utilizando el método del modelo
        const isMatch = await client.comparePassword(password);
        
        // Si la contraseña no coincide
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: 'Credenciales inválidas' 
            });
        }
        
        // Verificar si la cuenta está verificada y advertir al usuario
        if (!client.isVerified) {
            // Podemos permitir el login pero advertir que la cuenta no está verificada
            console.log(`Usuario ${client.email} intentó iniciar sesión con cuenta no verificada`);
            // En este punto podríamos decidir no permitir el login para cuentas no verificadas
            // Pero para una mejor experiencia de usuario, permitiremos el login con advertencia
        }
        
        // Generar token de autenticación
        const token = generateToken(client._id);
        
        // Configurar cookie con el token (httpOnly para mayor seguridad)
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: config.server.env === 'production', // Solo HTTPS en producción
            sameSite: 'strict', // Protección contra CSRF
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días en milisegundos
        });
        
        // Enviar respuesta exitosa con datos del usuario y token
        res.json({
            success: true,
            client: {
                _id: client._id,
                fullName: client.fullName,
                email: client.email,
                age: client.age,
                country: client.country,
                isVerified: client.isVerified,
                role: client.role
            },
            token,
            message: client.isVerified ? 
                'Inicio de sesión exitoso' : 
                'Inicio de sesión exitoso. Por favor verifica tu cuenta para acceder a todas las funcionalidades'
        });
    } catch (error) {
        // Registrar error para depuración
        console.error('Error durante el inicio de sesión:', error);
        
        // Enviar respuesta genérica para no exponer detalles del error
        res.status(500).json({ 
            success: false, 
            message: 'Error del servidor al procesar el inicio de sesión' 
        });
    }
};
