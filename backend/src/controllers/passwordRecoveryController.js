/**
 * @file passwordRecoveryController.js
 * @description Controlador para la recuperación de contraseña de usuarios
 */

import Client from "../models/Clients.js";
import { sendEmail, generatePasswordRecoveryEmail } from "../services/emailService.js";
import bcrypt from "bcryptjs";

/**
 * Genera un código de recuperación aleatorio
 * @returns {string} - Código de recuperación de 6 dígitos
 */
const generateRecoveryCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Solicita recuperación de contraseña enviando un código al correo
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @returns {Object} - Respuesta con mensaje de éxito o error
 */
export const requestPasswordRecovery = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "El correo electrónico es obligatorio"
            });
        }

        // Buscar al usuario por su email
        const client = await Client.findOne({ email });

        if (!client) {
            return res.status(404).json({
                success: false,
                message: "No existe un usuario con ese correo electrónico"
            });
        }

        // Generar código de recuperación
        const recoveryCode = generateRecoveryCode();
        const recoveryCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

        // Actualizar el usuario con el código de recuperación
        client.resetPasswordCode = recoveryCode;
        client.resetPasswordCodeExpires = recoveryCodeExpires;
        await client.save();

        // Generar el HTML del correo
        const html = generatePasswordRecoveryEmail(recoveryCode);

        // Enviar el correo
        await sendEmail(
            client.email,
            "Recuperación de contraseña - Casino Remedial",
            `Tu código de recuperación es: ${recoveryCode}. Este código expira en 15 minutos.`,
            html
        );

        res.status(200).json({
            success: true,
            message: "Se ha enviado un código de recuperación a tu correo electrónico"
        });
    } catch (error) {
        console.error("Error al solicitar recuperación de contraseña:", error);
        res.status(500).json({
            success: false,
            message: "Error al solicitar recuperación de contraseña",
            error: error.message
        });
    }
};

/**
 * Verifica el código de recuperación y permite cambiar la contraseña
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @returns {Object} - Respuesta con mensaje de éxito o error
 */
export const verifyRecoveryCode = async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({
                success: false,
                message: "El correo y el código de recuperación son obligatorios"
            });
        }

        // Buscar al usuario por su email y código de recuperación
        const client = await Client.findOne({ 
            email,
            resetPasswordCode: code,
            resetPasswordCodeExpires: { $gt: Date.now() } 
        });

        if (!client) {
            return res.status(400).json({
                success: false,
                message: "Código de recuperación inválido o expirado"
            });
        }

        res.status(200).json({
            success: true,
            message: "Código de recuperación válido"
        });
    } catch (error) {
        console.error("Error al verificar código de recuperación:", error);
        res.status(500).json({
            success: false,
            message: "Error al verificar código de recuperación",
            error: error.message
        });
    }
};

/**
 * Cambia la contraseña después de validar el código de recuperación
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @returns {Object} - Respuesta con mensaje de éxito o error
 */
export const resetPassword = async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;

        if (!email || !code || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "El correo, código de recuperación y nueva contraseña son obligatorios"
            });
        }

        // Validar longitud de la contraseña
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "La contraseña debe tener al menos 8 caracteres"
            });
        }

        // Buscar al usuario por su email y código de recuperación
        const client = await Client.findOne({ 
            email,
            resetPasswordCode: code,
            resetPasswordCodeExpires: { $gt: Date.now() } 
        });

        if (!client) {
            return res.status(400).json({
                success: false,
                message: "Código de recuperación inválido o expirado"
            });
        }

        // Actualizar la contraseña
        client.password = newPassword;
        client.resetPasswordCode = null;
        client.resetPasswordCodeExpires = null;
        await client.save();

        res.status(200).json({
            success: true,
            message: "Contraseña actualizada exitosamente"
        });
    } catch (error) {
        console.error("Error al restablecer contraseña:", error);
        res.status(500).json({
            success: false,
            message: "Error al restablecer contraseña",
            error: error.message
        });
    }
};
