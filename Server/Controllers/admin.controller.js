import { movieModel } from '../Models/addMovieModel.js'

export const addMovieController = async (request, response, next) => {
    console.log(request.body);
    const movieDetails = await request.body


    const requiredFields = [
        "movieName", "genre", "language", "duration", "releaseDate",
        "rating", "cast", "director", "posterUrl", "trailerUrl", "description"
    ];
    const missingFields = requiredFields.filter(field => !movieDetails[field]);
    if (missingFields.length > 0) {
        return response.status(400).json({
            success: false,
            message: `Missing required fields: ${missingFields.join(", ")}`
        });
    }

    console.log(movieDetails)
    const newMovie = new movieModel(movieDetails)
    await newMovie.save()
    response.send({ success: true, message: 'Movie Added Successfully' })
}
export const addPosterController = async (request, response, next, error) => {
    if (!request.file) {
        response.status(400).json({ success: false, message: "Can't get Image" })
        next(error.message)
    }
    console.log(request.file)
    response.status(200).json({ success: true, message: "Image Upload Successfully" })
}