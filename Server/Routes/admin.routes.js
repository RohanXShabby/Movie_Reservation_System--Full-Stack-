import { Router } from 'express'
import movieModel from '../Models/addMovieModel.js'
import { addMovieController } from '../Controllers/admin.controller.js'
import { asyncHandler } from '../Utils/asyncHandler'

const adminRoute = Router()

adminRoute.post('/add-movie', asyncHandler(addMovieController))