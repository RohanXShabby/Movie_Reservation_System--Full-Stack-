import env from 'dotenv'
import jwt from 'jsonwebtoken'
import customError from '../Utils/errorHandler.js'
env.config()

export const authCheck = async (request, response, next) => {
    try {
        const jwtToken = request.cookies.jwttoken
        if (!jwtToken) {
            throw new customError("Unautohorize User", 401)
        }
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET)
        console.log(decoded)

        if (!decoded) {
            throw new customError("Unautohorize User", 401)
        }
        request.user = decoded
        next()


    } catch (error) {
        next(error)
    }
}