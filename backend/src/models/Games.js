/*
Campos:
Nombre del juego

Categoría (Mesa, Electrónico, Lotería, etc.)

Apuesta mínima

Apuesta máxima
*/

import {Schema, model} from "mongoose";

const GameSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre del juego es obligatorio"],
        unique: true,
        trim: true
    },
    category: {
        type: String,
        required: [true, "La categoría del juego es obligatoria"],
        enum: {
            values: ["Mesa", "Electrónico", "Lotería", "Cartas", "Dados", "Otros"],
            message: "{VALUE} no es una categoría válida"
        }
    },
    minBet: {
        type: Number,
        required: [true, "La apuesta mínima es obligatoria"],
        min: [1, "La apuesta mínima debe ser al menos 1"]
    },
    maxBet: {
        type: Number,
        required: [true, "La apuesta máxima es obligatoria"],
        validate: {
            validator: function(value) {
                // Verifica que maxBet sea mayor que minBet
                return value > this.minBet;
            },
            message: "La apuesta máxima debe ser mayor que la apuesta mínima"
        }
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default model("Game", GameSchema);
