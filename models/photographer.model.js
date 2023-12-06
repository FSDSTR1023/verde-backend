import { Schema, model } from "mongoose";

const photographerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    surname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// TODO: Hay que crear el schema del cliente para poder asociarlo al photographerSchema y viceversa

export const PhotographerModel = model("Photographer", photographerSchema);