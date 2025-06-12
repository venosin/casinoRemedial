/**
 * Script para crear un usuario administrador basado en las variables de entorno
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Client from './src/models/Clients.js';

dotenv.config();

async function createAdminUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
    
    // Verificar si ya existe un administrador con el email especificado
    const adminExists = await Client.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (adminExists) {
      console.log('Ya existe un usuario con el email:', process.env.ADMIN_EMAIL);
      
      // Si existe pero no es admin, actualizarlo a admin
      if (adminExists.role !== 'admin') {
        adminExists.role = 'admin';
        adminExists.isVerified = true; // Asegurarse que esté verificado
        await adminExists.save();
        console.log('Usuario actualizado a rol de administrador');
      } else {
        console.log('El usuario ya tiene rol de administrador');
      }
      
      return;
    }
    
    // Crear nuevo administrador
    const admin = new Client({
      fullName: 'Administrador Sistema',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      age: 30,
      country: 'El Salvador',
      isVerified: true, // Marcar como verificado
      role: 'admin'
    });
    
    await admin.save();
    console.log('✅ Administrador creado exitosamente:', admin.email);
  } catch (error) {
    console.error('❌ Error al crear administrador:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  }
}

createAdminUser();
