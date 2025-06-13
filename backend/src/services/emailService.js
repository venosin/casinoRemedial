/**
 * @file emailService.js
 * @description Servicio para enviar correos electrónicos utilizando Nodemailer
 */

import nodemailer from "nodemailer";
import config from "../../src/config.js";

// Configurar el transporter de Nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.APP_PASSWORD_EMAIL
    },
});

/**
 * Envía un correo electrónico
 * @param {string} to - Destinatario del correo
 * @param {string} subject - Asunto del correo
 * @param {string} text - Versión en texto plano del correo
 * @param {string} html - Versión HTML del correo
 * @returns {Promise} - Información del envío del correo
 */
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Casino Remedial" <${process.env.ADMIN_EMAIL}>`, // Dirección del remitente
            to, // Dirección(es) del destinatario
            subject, // Asunto
            text, // Cuerpo del correo en texto plano
            html, // Cuerpo del correo en HTML
        });

        return info;
    } catch (error) {
        console.error("Error al enviar correo:", error);
        throw new Error("No se pudo enviar el correo");
    }
};

/**
 * Genera el HTML para un correo de recuperación de contraseña
 * @param {string} code - Código de verificación
 * @returns {string} - HTML para el correo de recuperación
 */
const generatePasswordRecoveryEmail = (code) => {
    return `
        <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f9; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2c3e50; font-size: 24px; margin-bottom: 20px;">Casino Remedial - Recuperación de Contraseña</h1>
            <p style="font-size: 16px; color: #555; line-height: 1.5;">
                Hola, recibimos una solicitud para restablecer tu contraseña. Utiliza el código de verificación a continuación para continuar:
            </p>
            <div style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 18px; font-weight: bold; color: #fff; background-color: #ff7f50; border-radius: 5px; border: 1px solid #e67e22;">
                ${code}
            </div>
            <p style="font-size: 14px; color: #777; line-height: 1.5;">
                Este código es válido durante los próximos <strong>15 minutos</strong>. Si no solicitaste este correo, puedes ignorarlo de forma segura.
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <footer style="font-size: 12px; color: #aaa;">
                Si necesitas asistencia adicional, contacta a nuestro equipo de soporte en 
                <a href="mailto:support@casinoremedial.com" style="color: #3498db; text-decoration: none;">support@casinoremedial.com</a>.
            </footer>
        </div>
    `;
};

/**
 * Genera el HTML para un correo de verificación de cuenta
 * @param {string} code - Código de verificación
 * @returns {string} - HTML para el correo de verificación
 */
const generateEmailVerificationEmail = (code) => {
    return `
        <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f9; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2c3e50; font-size: 24px; margin-bottom: 20px;">Casino Remedial - Verificación de Cuenta</h1>
            <p style="font-size: 16px; color: #555; line-height: 1.5;">
                ¡Gracias por registrarte en Casino Remedial! Para completar tu registro, verifica tu cuenta utilizando el siguiente código:
            </p>
            <div style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 18px; font-weight: bold; color: #fff; background-color: #3498db; border-radius: 5px; border: 1px solid #2980b9;">
                ${code}
            </div>
            <p style="font-size: 14px; color: #777; line-height: 1.5;">
                Este código es válido durante los próximos <strong>30 minutos</strong>. Si no te has registrado en nuestra plataforma, puedes ignorar este correo.
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <footer style="font-size: 12px; color: #aaa;">
                Si necesitas asistencia adicional, contacta a nuestro equipo de soporte en 
                <a href="mailto:support@casinoremedial.com" style="color: #3498db; text-decoration: none;">support@casinoremedial.com</a>.
            </footer>
        </div>
    `;
};

// Exportar las funciones
export {
    sendEmail,
    generatePasswordRecoveryEmail,
    generateEmailVerificationEmail
};
