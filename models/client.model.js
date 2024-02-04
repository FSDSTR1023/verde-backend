import { Schema, model } from "mongoose";

const clientSchema = new Schema({
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
    lowercase: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  gallery: [{
    type: Schema.Types.ObjectId,
    ref: "Gallerie"
  }],
  isDeleted: {
    type: Boolean,
    default: false
  }
},
  { timestamps: true }
);

export const ClientModel = model("Client", clientSchema);
