import { Schema, model } from "mongoose";

const GallerySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    minPics: {
        type: Number,
    },
    totalPrice: {
        type: Number,
    },
    photos: [{
        type: String,
        trim: true,
        required: true,
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
);

export const galleryModel = model("Gallerie", GallerySchema);