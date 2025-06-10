/**
 * @file emailVerificationController.js
 * @description Controlador para la verificación de email de usuarios
 */

import Client from "../models/Clients.js";
import { sendEmail, generateEmailVerificationEmail } from "../services/emailService.js";

/**
 * Genera un código de verificación aleatorio
 * @returns {string} - Código de verificación de 6 dígitos
 */
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Envía un correo de verificación al usuario
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @returns {Object} - Respuesta con mensaje de éxito o error
 */
export const sendVerificationEmail = async (req, res) => {
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

        // Si el usuario ya está verificado
        if (client.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Este correo ya ha sido verificado anteriormente"
            });
        }

        // Generar código de verificación
        const verificationCode = generateVerificationCode();
        const verificationCodeExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos

        // Actualizar el usuario con el código de verificación
        client.verificationCode = verificationCode;
        client.verificationCodeExpires = verificationCodeExpires;
        await client.save();

        // Generar el HTML del correo
        const html = generateEmailVerificationEmail(verificationCode);

        // Enviar el correo
        await sendEmail(
            client.email,
            "Verificación de cuenta - Casino Remedial",
            `Tu código de verificación es: ${verificationCode}. Este código expira en 30 minutos.`,
            html
        );

        res.status(200).json({
            success: true,
            message: "Se ha enviado un código de verificación a tu correo electrónico"
        });
    } catch (error) {
        console.error("Error al enviar correo de verificación:", error);
        res.status(500).json({
            success: false,
            message: "Error al enviar correo de verificación",
            error: error.message
        });
    }
};

/**
 * Verifica el código enviado por email para activar la cuenta
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @returns {Object} - Respuesta con mensaje de éxito o error
 */
export const verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({
                success: false,
                message: "El correo y el código de verificación son obligatorios"
            });
        }

        // Buscar al usuario por su email
        const client = await Client.findOne({ 
            email,
            verificationCode: code,
            verificationCodeExpires: { $gt: Date.now() } 
        });

        if (!client) {
            return res.status(400).json({
                success: false,
                message: "Código de verificación inválido o expirado"
            });
        }

        // Actualizar el usuario como verificado
        client.isVerified = true;
        client.verificationCode = null;
        client.verificationCodeExpires = null;
        await client.save();

        res.status(200).json({
            success: true,
            message: "Cuenta verificada exitosamente"
        });
    } catch (error) {
        console.error("Error al verificar email:", error);
        res.status(500).json({
            success: false,
            message: "Error al verificar email",
            error: error.message
        });
    }
};

/**
 * Reenvía el código de verificación al email
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @returns {Object} - Respuesta con mensaje de éxito o error
 */
export const resendVerificationEmail = async (req, res) => {
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

        // Si el usuario ya está verificado
        if (client.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Este correo ya ha sido verificado anteriormente"
            });
        }

        // Generar nuevo código de verificación
        const verificationCode = generateVerificationCode();
        const verificationCodeExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos

        // Actualizar el usuario con el nuevo código de verificación
        client.verificationCode = verificationCode;
        client.verificationCodeExpires = verificationCodeExpires;
        await client.save();

        // Generar el HTML del correo
        const html = generateEmailVerificationEmail(verificationCode);

        // Enviar el correo
        await sendEmail(
            client.email,
            "Verificación de cuenta - Casino Remedial",
            `Tu código de verificación es: ${verificationCode}. Este código expira en 30 minutos.`,
            html
        );

        res.status(200).json({
            success: true,
            message: "Se ha reenviado un código de verificación a tu correo electrónico"
        });
    } catch (error) {
        console.error("Error al reenviar correo de verificación:", error);
        res.status(500).json({
            success: false,
            message: "Error al reenviar correo de verificación",
            error: error.message
        });
    }
};
