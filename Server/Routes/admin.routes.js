import { Router } from 'express'
import { addMovieController, addPosterController } from '../Controllers/admin.controller.js'
import { asyncHandler } from '../Utils/asyncHandler.js'
import multer from 'multer'
import { storage, fileFilter } from '../Middleware/multer.js'

export const adminRouter = Router()

const upload = multer({ storage, fileFilter })

adminRouter.post('/add-movie', asyncHandler(addMovieController))
adminRouter.post('/add-poster', upload.single('image'), asyncHandler(addPosterController))