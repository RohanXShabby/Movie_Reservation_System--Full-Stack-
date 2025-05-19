import { Router } from 'express'
import { addMovieController } from '../Controllers/admin.controller.js'
import { asyncHandler } from '../Utils/asyncHandler.js'

export const adminRouter = Router()

adminRouter.post('/add-movie', asyncHandler(addMovieController))