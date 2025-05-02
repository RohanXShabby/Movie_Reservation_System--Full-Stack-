import { Router } from "express";
import { initialController, registerController } from "../Controllers/user.controller.js";
import { asyncHandler } from "../Utils/asyncHandler.js";



export const router = Router()


router.get('/', asyncHandler(initialController))

router.post('/register', asyncHandler(registerController))

