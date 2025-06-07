import app from "./app.js";
import "./database.js";
import dotenv from "dotenv";

dotenv.config();

import { config } from "./src/config.js";

async function main() {
  const port = config.server.port;
  app.listen(port);
  // Conexión a la base de datos en MongoDB
  if (config.environment.status === "development") {
    console.log("Server runing in port " + port);
  } else {
    console.log("Server runing");
  }
}

main();
