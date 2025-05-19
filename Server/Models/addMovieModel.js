import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true,
        unique: true,
    },
    genre: {
        type: [String],
        required: true,
    },
    language: {
        type: [String],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    director: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    trailerUrl: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const movieModel = mongoose.model('movies', movieSchema);