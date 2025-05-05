import { Router } from "express";
import { initialController, registerController, verifyEmailController, userLoginController, otpController } from "../Controllers/user.controller.js";
import { asyncHandler } from "../Utils/asyncHandler.js";



export const router = Router()


router.get('/', asyncHandler(initialController))

router.post('/register', asyncHandler(registerController))

router.get('/verify/:ID/:token', asyncHandler(verifyEmailController))

router.post('/userlogin', asyncHandler(userLoginController))

router.post('/otp', asyncHandler(otpController))

