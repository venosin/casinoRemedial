/**
 * @file config.js
 * @description Configuración centralizada para la aplicación
 */

import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

export const config = {
  environment: {
    status: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV !== 'production',
  },
  server: {
    port: process.env.PORT || 4000,
    host: process.env.HOST || 'localhost',
  },
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/casinoRemedial',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'secret_token_development',
    jwtExpire: process.env.JWT_EXPIRE || '30d',
    cookieExpire: parseInt(process.env.COOKIE_EXPIRE, 10) || 30,
  },
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  },
};
