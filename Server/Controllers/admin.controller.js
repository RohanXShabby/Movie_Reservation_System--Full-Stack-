import { movieModel } from '../Models/addMovieModel.js'

export const addMovieController = async (request, response, next) => {
        console.log(request.body);
        const movieDetails = request.body;

        const requiredFields = [
            "title", "genre", "language", "duration", "releaseDate",
            "rating", "cast", "director", "posterUrl", "trailerUrl", "description"
        ];
        const missingFields = requiredFields.filter(field => !movieDetails[field]);
        if (missingFields.length > 0) {
            return response.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(", ")}`
            });
        } console.log('Processed movie details:', movieDetails);
        const newMovie = new movieModel(movieDetails);
        await newMovie.save();
        response.status(201).json({
            success: true,
            message: 'Movie Added Successfully',
            movie: newMovie
        });
    }

export const addPosterController = async (request, response, next) => {
    try {
        if (!request.file || !request.file.path) {
            return response.status(400).json({ success: false, message: "Can't get Image" });
        }
        const { path: imageUrl, filename } = request.file;

        return response.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            url: imageUrl, // Changed from secure_url to url to match what frontend expects
            filename,
        });
    } catch (error) {
        console.error("Upload error:", error);
        next(error);
    }
};
