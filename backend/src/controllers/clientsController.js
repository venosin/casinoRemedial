    /**
 * @file clientsController.js
 * @description Controlador para gestionar operaciones CRUD de clientes con verificación por email
 */

import Client from '../models/Clients.js';
import { sendEmail, generateEmailVerificationEmail } from '../services/emailService.js';

/**
 * Genera un código de verificación aleatorio
 * @returns {string} - Código de verificación de 6 dígitos
 */
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * @desc    Registrar un nuevo cliente con verificación por email
 * @route   POST /api/clients
 * @access  Public
 */
export const registerClient = async (req, res) => {
    try {
        // Obtener datos del body
        const { fullName, email, password, age, country } = req.body;
        
        // Validar datos obligatorios
        if (!fullName || !email || !password || !age || !country) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son obligatorios'
            });
        }

        // Validar formato de email
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Formato de email inválido'
            });
        }

        // Validar edad (entre 18 y 120)
        if (age < 18 || age > 120) {
            return res.status(400).json({
                success: false,
                message: 'La edad debe estar entre 18 y 120 años'
            });
        }

        // Verificar si el cliente ya existe con ese email
        const clientExists = await Client.findOne({ email });
        
        if (clientExists) {
            return res.status(400).json({ 
                success: false, 
                message: 'El cliente ya está registrado con ese email' 
            });
        }
        
        // Generar código de verificación
        const verificationCode = generateVerificationCode();
        const verificationCodeExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos
        
        // Crear el nuevo cliente (la contraseña se encripta automáticamente por el middleware)
        const client = await Client.create({
            fullName,
            email,
            password,
            age,
            country,
            isVerified: false,
            verificationCode,
            verificationCodeExpires
        });
        
        // Si se crea correctamente, enviar email de verificación
        if (client) {
            try {
                // Generar el HTML del correo
                const html = generateEmailVerificationEmail(verificationCode);
                
                // Enviar el correo de verificación
                await sendEmail(
                    client.email,
                    "Verificación de cuenta - Casino Remedial",
                    `Tu código de verificación es: ${verificationCode}. Este código expira en 30 minutos.`,
                    html
                );
                
                res.status(201).json({
                    success: true,
                    message: 'Cliente registrado exitosamente. Por favor verifica tu correo electrónico.',
                    client: {
                        _id: client._id,
                        fullName: client.fullName,
                        email: client.email,
                        age: client.age,
                        country: client.country,
                        isVerified: client.isVerified
                    }
                });
            } catch (emailError) {
                console.error("Error al enviar correo de verificación:", emailError);
                
                // Aún si falla el envío de correo, el usuario fue creado
                res.status(201).json({
                    success: true,
                    message: 'Cliente registrado exitosamente, pero hubo un problema al enviar el correo de verificación. Por favor, solicita un nuevo código.',
                    client: {
                        _id: client._id,
                        fullName: client.fullName,
                        email: client.email,
                        age: client.age,
                        country: client.country,
                        isVerified: client.isVerified
                    }
                });
            }
        } else {
            res.status(400).json({ 
                success: false, 
                message: 'Datos de cliente inválidos' 
            });
        }
    } catch (error) {
        // Manejo de errores específicos de validación de Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }
        
        console.error('Error al registrar cliente:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error del servidor' 
        });
    }
};



/**
 * @desc    Obtener todos los clientes
 * @route   GET /api/clients
 * @access  Private/Admin
 */
export const getAllClients = async (req, res) => {
    try {
        // Obtener todos los clientes, excluyendo la contraseña
        const clients = await Client.find({}).select('-password');
        
        res.json({
            success: true,
            count: clients.length,
            clients,
        });
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error del servidor' 
        });
    }
};

/**
 * @desc    Obtener un cliente por ID
 * @route   GET /api/clients/:id
 * @access  Private/Admin o el propio cliente
 */
export const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id).select('-password');
        
        if (client) {
            res.json({
                success: true,
                client,
            });
        } else {
            res.status(404).json({ 
                success: false, 
                message: 'Cliente no encontrado' 
            });
        }
    } catch (error) {
        console.error('Error al obtener cliente por ID:', error);
        
        // Manejar error de ID inválido
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ 
                success: false, 
                message: 'ID de cliente inválido' 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Error del servidor' 
        });
    }
};

/**
 * @desc    Actualizar datos de cliente
 * @route   PUT /api/clients/:id
 * @access  Private (el propio cliente o admin)
 */
export const updateClient = async (req, res) => {
    try {
        const { fullName, email, age, country } = req.body;
        
        // Buscar cliente por ID
        const client = await Client.findById(req.params.id);
        
        if (!client) {
            return res.status(404).json({ 
                success: false, 
                message: 'Cliente no encontrado' 
            });
        }
        
        // Comprobar si el email ya está en uso por otro usuario
        if (email && email !== client.email) {
            const emailExists = await Client.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'El email ya está en uso' 
                });
            }
        }
        
        // Actualizar los campos
        client.fullName = fullName || client.fullName;
        client.email = email || client.email;
        client.age = age || client.age;
        client.country = country || client.country;
        
        // Guardar los cambios
        const updatedClient = await client.save();
        
        // Devolver los datos actualizados
        res.json({
            success: true,
            client: {
                _id: updatedClient._id,
                fullName: updatedClient.fullName,
                email: updatedClient.email,
                age: updatedClient.age,
                country: updatedClient.country,
            },
        });
    } catch (error) {
        // Manejo de errores específicos de validación de Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }
        
        console.error('Error al actualizar cliente:', error);
        
        // Manejar error de ID inválido
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ 
                success: false, 
                message: 'ID de cliente inválido' 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Error del servidor' 
        });
    }
};

/**
 * @desc    Actualizar contraseña
 * @route   PUT /api/clients/:id/password
 * @access  Private (el propio cliente)
 */
export const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        // Buscar cliente por ID incluyendo la contraseña
        const client = await Client.findById(req.params.id);
        
        if (!client) {
            return res.status(404).json({ 
                success: false, 
                message: 'Cliente no encontrado' 
            });
        }
        
        // Verificar la contraseña actual
        const isMatch = await client.comparePassword(currentPassword);
        
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: 'Contraseña actual incorrecta' 
            });
        }
        
        // Asignar nueva contraseña
        client.password = newPassword;
        
        // Guardar (se encriptará automáticamente por el middleware)
        await client.save();
        
        res.json({
            success: true,
            message: 'Contraseña actualizada correctamente',
        });
    } catch (error) {
        console.error('Error al actualizar contraseña:', error);
        
        // Manejar error de ID inválido
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ 
                success: false, 
                message: 'ID de cliente inválido' 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Error del servidor' 
        });
    }
};

/**
 * @desc    Eliminar cliente
 * @route   DELETE /api/clients/:id
 * @access  Private (admin o el propio cliente)
 */
export const deleteClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        
        if (!client) {
            return res.status(404).json({ 
                success: false, 
                message: 'Cliente no encontrado' 
            });
        }
        
        await client.deleteOne();
        
        res.json({
            success: true,
            message: 'Cliente eliminado correctamente',
        });
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        
        // Manejar error de ID inválido
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ 
                success: false, 
                message: 'ID de cliente inválido' 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Error del servidor' 
        });
    }
};
