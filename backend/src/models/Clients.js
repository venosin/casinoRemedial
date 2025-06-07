/**
 * @file Clients.js
 * @description Modelo de datos para clientes del casino con verificación de email y recuperación de contraseña
 */

import {Schema, model} from "mongoose";
import bcrypt from "bcryptjs";

const ClientSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'El nombre completo es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minLength: [8, 'La contraseña debe tener al menos 8 caracteres']
    },
    age: {
        type: Number,
        required: [true, 'La edad es obligatoria'],
        min: [18, 'La edad mínima es 18 años'],
        max: [120, 'La edad máxima es 120 años']
    },
    country: {
        type: String,
        required: [true, 'El país es obligatorio'],
        trim: true
    },
    // Campos para verificación de email
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
        default: null
    },
    verificationCodeExpires: {
        type: Date,
        default: null
    },
    // Campos para recuperación de contraseña
    resetPasswordCode: {
        type: String,
        default: null
    },
    resetPasswordCodeExpires: {
        type: Date,
        default: null
    },
    // Rol de usuario (por defecto 'client', puede ser 'admin')
    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client'
    }
}, { timestamps: true });


// Antes de guardar, hash la contraseña
ClientSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar contraseñas
ClientSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default model("Client", ClientSchema);
