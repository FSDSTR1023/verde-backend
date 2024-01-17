import { Schema, model } from "mongoose";

const GallerySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    photos: [{
        type: String,
        trim: true,
    }],
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Client"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
);

export const galleryModel = model("Gallerie", GallerySchema);