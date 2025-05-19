import MovieModel from '../Models/addMovieModel.js'

export const addMovieController = (request, response, next) => {
    const movieDetails = request.body
    response.send('Movie Added Success')
}