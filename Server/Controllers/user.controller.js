import { User } from "../Models/user.model.js"
import bcrypt from 'bcrypt'
import emailSender from "../Service/mailer.service.js"



export const initialController = async (request, response) => {
    response.status(200).send({ 'message': "Server Running" })
}


export const signupController = async (request, response) => {
    try {
        const { name, email, password } = request.body
        if (!name || !email || !password) {
            return response.status(400).json({ success: false, Message: 'All Feild Required' })
        }
        const hashedPassword = await bcrypt.hash(password, 5)
        const lowerCaseEmail = email.trim().toLowerCase()
        const userDetail = new User({
            name,
            email: lowerCaseEmail,
            password: hashedPassword,
        })

        const subject = 'Sign Up Confermation'
        const content = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h1 style="color: #4CAF50;">Welcome to Our Community, ${name}!</h1>
            <p>We are thrilled to have you on board. Thank you for signing up and trusting us.</p>
            <p>Here’s to an amazing journey together. If you have any questions or need assistance, feel free to reach out to us anytime.</p>
            <p>Best Regards,</p>
            <p><strong>The Team</strong></p>
        </div>
        `;

        emailSender(email, subject, content)

        response.status(201).json({ success: true, data: userDetail })
    } catch (error) {
        console.error(error.message)
        response.status(500).json({ message: 'internal Server Error' })
    }


}