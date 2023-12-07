import { Schema, model } from "mongoose";

const GalerySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    photos: [{
        type: String,
        trim: true,
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
);

export const galeryModel = model("Galerie", GalerySchema);