import { User } from "../Models/user.model.js"
import bcrypt from 'bcrypt'
import emailSender from "../Service/mailer.service.js"
import customError from "../Utils/errorHandler.js"



export const initialController = async (request, response, next) => {
    response.status(200).send({ 'message': "Server Running" })
}


export const registerController = async (request, response, next) => {

    const { name, email, password } = request.body
    if (!name || !email || !password) {
        throw new customError('All Feilds Required', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 5)
    const lowerCaseEmail = email.trim().toLowerCase()
    const userDetail = new User({
        name,
        email: lowerCaseEmail,
        password: hashedPassword,
    })

    await userDetail.save()

    const subject = 'Sign Up Confermation'
    const content = `
        <div style="font-family: poppins; line-height: 1.6; color: orange;">
            <h1 style="color: #4CAF50;">Welcome to Our Community, ${name}!</h1>
            <p>We are thrilled to have you on board. Thank you for signing up and trusting us.</p>
            <p>Here’s to an amazing journey together. If you have any questions or need assistance, feel free to reach out to us anytime.</p>
            <p>Best Regards,</p>
            <p><strong>The Team</strong></p>
        </div>
        `;

    emailSender(email, subject, content)
    response.status(201).json({ success: true, data: userDetail })


}