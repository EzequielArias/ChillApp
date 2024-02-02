import mongoose, { Schema } from "mongoose";

const ChillNewsSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    avatar: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    content: {
        type: mongoose.Schema.Types.String,
        required: true
    },
}, {
    timestamps: true // Agrega los campos createdAt y updatedAt automáticamente
});

export const chillNewsModel = mongoose.model('ChillNews', ChillNewsSchema);