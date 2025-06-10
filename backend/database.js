/**
 * @file database.js
 * @description Configuración de la conexión a la base de datos MongoDB
 * 
 * Este archivo establece la conexión a una base de datos en MongoDB.
 * Si la base de datos no existe, MongoDB la creará automáticamente.
 */

// Importaciones necesarias
import mongoose from "mongoose";
import config from "./src/config.js";

// Opciones de configuración de Mongoose
const mongooseOptions = {
  // Estas opciones mejoran la estabilidad y el rendimiento de la conexión
  autoIndex: true, // Creación de índices en el arranque
  serverSelectionTimeoutMS: 5000, // Tiempo de espera para la selección del servidor
  socketTimeoutMS: 45000, // Tiempo de espera para las operaciones
};

// Obtener la URI de la base de datos desde la configuración
const dbUri = config.database.uri;
const environmentStatus = config.environment.status;

// Establecer la conexión a la base de datos
mongoose
  .connect(dbUri, mongooseOptions)
  .then(() => {
    // No necesitamos hacer nada aquí ya que usamos eventos para manejar la conexión
  })
  .catch((err) => {
    console.error("Error inicial al conectar a MongoDB:", err.message);
  });

// Guardar referencia a la conexión para uso posterior
const connection = mongoose.connection;

// Manejadores de eventos para la conexión
connection.once("open", () => {
  console.log(`Database is connected to: ${dbUri} (${environmentStatus} mode)`);
});

connection.on("disconnected", () => {
  console.log("Database connection lost. Attempting to reconnect...");
  // La reconexión es manejada automáticamente por mongoose
});

connection.on("reconnected", () => {
  console.log("Successfully reconnected to MongoDB");
});

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err.message);
});

// Manejo de señales para cierre graceful
process.on("SIGINT", async () => {
  try {
    await connection.close();
    console.log("MongoDB connection closed due to application termination");
    process.exit(0);
  } catch (err) {
    console.error("Error during MongoDB disconnection:", err);
    process.exit(1);
  }
});

export default connection;
