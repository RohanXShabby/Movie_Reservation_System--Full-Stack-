import { Router } from "express";
import { initialController ,signupController } from "../Controllers/user.controller.js";



export const router = Router()


router.get('/', initialController)

router.post('/signup' , signupController)

