import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    emailToken: {
        type: String,
        default: null
    },
    otp: {
        type: String,
        default: null
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const AdminModel = mongoose.model('Admins', adminSchema);