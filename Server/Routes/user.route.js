import { Router } from "express";
import { initialController, registerController, verifyEmailController, userLoginController } from "../Controllers/user.controller.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { authCheck } from "../Middleware/auth.middleware.js";



export const router = Router()


router.get('/', authCheck, asyncHandler(initialController))

router.post('/register', asyncHandler(registerController))

router.get('/verify/:ID/:token', asyncHandler(verifyEmailController))


router.post('/userlogin', asyncHandler(userLoginController))

