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
    customers: [{
        type: Schema.Types.ObjectId,
        ref: "Customer"
    }],
    gallery: [{
        type: Schema.Types.ObjectId,
        ref: "Gallerie"
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
);

export const PhotographerModel = model("Photographer", photographerSchema);