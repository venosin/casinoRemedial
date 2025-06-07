/**
 * @file app.js
 * @description Archivo principal de configuración de la aplicación Express
 */

// Importación de dependencias
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// Importación de rutas
import clientRoutes from "./src/routes/clientRoutes.js";
import gameRoutes from "./src/routes/gameRoutes.js";
import loginRoutes from "./src/routes/loginRoutes.js";
import logoutRoutes from "./src/routes/logoutRoutes.js";
import emailVerificationRoutes from "./src/routes/emailVerificationRoutes.js";
import passwordRecoveryRoutes from "./src/routes/passwordRecoveryRoutes.js";

// Configuración de variables de entorno
dotenv.config();

// Creación de la instancia de Express
const app = express();

// Middlewares globales
app.use(express.json()); // Parseo de JSON en el cuerpo de las peticiones
app.use(express.urlencoded({ extended: true })); // Parseo de datos de formularios
app.use(cookieParser()); // Manejo de cookies para autenticación

// Configuración de CORS para permitir peticiones desde el frontend
app.use(cors({
    origin: process.env.FRONTEND_URL || "*", // Permitir origen configurable o todos
    credentials: true, // Habilitar envío de cookies y headers de autenticación
}));

// Ruta base para verificar si el servidor está funcionando
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API de Casino Remedial funcionando correctamente",
        timestamp: new Date().toISOString()
    });
});

// Configuración de rutas
app.use("/api/login", loginRoutes);     // Ruta de inicio de sesión
app.use("/api/logout", logoutRoutes);   // Rutas de cierre de sesión y verificación de estado
app.use("/api/clients", clientRoutes);  // Rutas para gestión de clientes
app.use("/api/games", gameRoutes);      // Rutas para gestión de juegos
app.use("/api/verify-email", emailVerificationRoutes);  // Rutas para verificación de email
app.use("/api/recover-password", passwordRecoveryRoutes);  // Rutas para recuperación de contraseña

// Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Ruta no encontrada"
    });
});

// Middleware para manejo de errores global
app.use((err, req, res, next) => {
    console.error("Error:", err);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || "Error interno del servidor";
    
    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack
    });
});

// Exportación de la instancia de Express configurada
export default app;
