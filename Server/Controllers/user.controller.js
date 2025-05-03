import { User } from "../Models/user.model.js"
import bcrypt from 'bcrypt'
import emailSender from "../Service/mailer.service.js"
import customError from "../Utils/errorHandler.js"
import { emailVerification } from "../Templates/mailTemplates.js"
import { randomBytes, createHash } from 'crypto';

export const initialController = async (request, response, next) => {
    response.status(200).send({ 'message': "Server Running" })
}

export const registerController = async (request, response, next) => {

    const { name, email, password } = request.body
    if (!name || !email || !password) {
        throw new customError('All Feilds Required', 400);
    }
    const token = randomBytes(32).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 5)
    const lowerCaseEmail = email.trim().toLowerCase()
    const userDetail = new User({
        name,
        email: lowerCaseEmail,
        password: hashedPassword,
        emailToken: token,
    })

    await userDetail.save()

    const subject = 'Sign Up Confermation'
    const content = emailVerification()
        .replace('userName', name)
        .replace('VerifyUrl', `http://localhost:3000/api/verify/${userDetail._id}/${token}`);

    emailSender(email, subject, content)
    response.status(201).json({ success: true, data: userDetail })

}

export const verifyEmailController = async (request, response) => {
    const { ID, token } = request.params;
    const user = await User.findById(ID);

    console.log(ID, token)

    if (!user) {
        throw new customError('User not found', 404);
    }
    if (user.emailToken !== token) {
        throw new customError('Invalid Token', 400);
    }
    user.isVerified = true;
    user.emailToken = undefined;
    await user.save();

    response.status(200).redirect('http://localhost:5173/verifiedstatus');
};
