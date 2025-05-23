import { User } from "../Models/user.model.js";
import bcrypt from "bcrypt";
import emailSender from "../Service/mailer.service.js";
import customError from "../Utils/errorHandler.js";
import { emailVerification } from "../Templates/mailTemplates.js";
import { randomBytes } from "crypto";
import { optTemplate } from "../Templates/otpTemplates.js";
import env from "dotenv";
import jwt from 'jsonwebtoken'
import { movieModel } from '../Models/addMovieModel.js'

env.config();

export const initialController = async (request, response, next) => {
    response.status(200).send({ message: "User Authorized", userDetails: request.user });
};

export const registerController = async (request, response, next) => {
    const { name, email, password } = request.body;
    if (!name || !email || !password) {
        throw new customError("All Feilds Required", 400);
    }
    const token = randomBytes(16).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 5);
    const lowerCaseEmail = email.trim().toLowerCase();
    const userDetail = new User({
        name,
        email: lowerCaseEmail,
        password: hashedPassword,
        emailToken: token,
    });

    await userDetail.save();

    const subject = "Sign Up Confirmation";
    const content = emailVerification()
        .replace("userName", name)
        .replace(
            "VerifyUrl",
            `http://localhost:3000/api/verify/${userDetail._id}/${token}`,
        );

    emailSender(email, subject, content);
    response.status(201).json({ success: true, data: userDetail });
};

export const verifyEmailController = async (request, response) => {
    const { ID, token } = request.params;
    const user = await User.findById(ID);

    if (!user) {
        throw new customError("User not found", 404);
    }
    if (user.emailToken !== token) {
        throw new customError("Invalid Token", 400);
    }
    user.isVerified = true;
    user.emailToken = undefined;
    await user.save();

    response.status(200).redirect("http://localhost:5173/verifiedstatus");
};

export const userLoginController = async (request, response) => {
    const { email, password } = await request.body;

    if ((!email, !password)) {
        throw new customError("Please fill all the Feild", 400);
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new customError("User not found", 404);
    }

    if (!user.isVerified) {
        throw new customError("Please Verify you Email before login", 400);
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
        throw new customError("Wrong password try again", 400);
    } const data = { id: user._id, name: user.name, email: user.email }

    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "10d" })

    // Set the Authorization header with Bearer token
    response.set('Access-Control-Expose-Headers', 'Authorization');
    response.set('Authorization', `Bearer ${token}`);

    // Send the token in the response body as well
    response.status(200).json({
        message: "User logged In successfully",
        token: token,
        user: {
            name: user.name,
            email: user.email
        }
    });
};

export const otpController = async (request, response) => {
    const { email } = request.body;
    const userDetails = await User.findOne({ email });

    if (!userDetails) {
        throw new customError("User not found", 404);
    }
    const OTP = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
    userDetails.otp = OTP;

    await userDetails.save();

    const subject = "Password Reset OTP";
    const content = optTemplate(OTP);

    emailSender(email, subject, content);
    response.status(200).json("OTP Sent successfully");
};


export const verifyOtpController = async (request, response) => {
    const { email, otp } = await request.body;
    const userDetails = await User.findOne({ email });

    if (!userDetails) {
        throw new customError("User not found", 404);
    }
    if (userDetails.otp !== otp) {
        throw new customError('Invalid OTP', 400)
    }
    userDetails.otp = undefined
    await userDetails.save();

    response.status(200).json("OTP verify successfully").redirect(`${process.env.FRONTEND_URL}/password-reset`)
};

export const passwordResetController = async (request, response) => {
    const { email, newPassword } = request.body;
    const userDetails = await User.findOne({ email });

    if (!userDetails) {
        throw new customError("User not found", 404);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 16)

    userDetails.password = hashedPassword
    await userDetails.save();

    response.status(200).json({ message: "Password Changed successfully" });
};

export const getAllMovieController = async (request, response, next) => {
    const movies = await movieModel.find()
    if (!movies) {
        throw new customError('Can,t Get Movies', 404)
    }
    response.status(200).json({ message: "Movie fetched Successfully", movies })
}

export const getSingleMovieController = async (request, response) => {
    const { id } = request.params

    response.status(200).json({ message: "success", id })

}