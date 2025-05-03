import { Router } from "express";
import { initialController, registerController, verifyEmailController } from "../Controllers/user.controller.js";
import { asyncHandler } from "../Utils/asyncHandler.js";



export const router = Router()


router.get('/', asyncHandler(initialController))

router.post('/register', asyncHandler(registerController))

router.get('/verify/:ID/:token', asyncHandler(verifyEmailController))

