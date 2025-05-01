import { Router } from "express";
import { initialController, registerController } from "../Controllers/user.controller.js";



export const router = Router()


router.get('/', initialController)

router.post('/register', registerController)

