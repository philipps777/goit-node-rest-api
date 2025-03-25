import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";
import HttpError from "../helpers/HttpError.js";
import path from "path";
import multer from "multer";
import gravatar from "gravatar";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "../helpers/emailService.js";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw HttpError(409, "Email in use");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email, { s: "250", d: "identicon" }, true);
        const verificationToken = uuidv4();

        const newUser = await User.create({ email, password: hashedPassword, avatarURL, verificationToken });

        await sendVerificationEmail(email, verificationToken);

        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
                avatarURL: newUser.avatarURL,
            },
        });
    } catch (error) {
        next(error);
    }
};


export const verifyEmail = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = await User.findOne({ where: { verificationToken } });

        if (!user) {
            throw HttpError(404, "User not found");
        }

        user.verificationToken = null;
        user.verify = true;
        await user.save();

        res.status(200).json({ message: "Verification successful" });
    } catch (error) {
        next(error);
    }
};


export const resendVerificationEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            throw HttpError(400, "Missing required field email");
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw HttpError(404, "User not found");
        }

        if (user.verify) {
            throw HttpError(400, "Verification has already been passed");
        }

        await sendVerificationEmail(email, user.verificationToken);

        res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw HttpError(401, "Email or password is wrong");
        }

        if (!user.verify) {
            throw HttpError(401, "Email not verified");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw HttpError(401, "Email or password is wrong");
        }

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "24h" });

        user.token = token;
        await user.save();

        res.status(200).json({
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            },
        });
    } catch (error) {
        next(error);
    }
};


export const logout = async (req, res, next) => {
    try {
        req.user.token = null;
        await req.user.save();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};


export const getCurrentUser = async (req, res, next) => {
    try {
        res.status(200).json({
            email: req.user.email,
            subscription: req.user.subscription,
        });
    } catch (error) {
        next(error);
    }
};



const tempDir = path.resolve("temp");
const avatarsDir = path.resolve("public/avatars");


const storage = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

export const upload = multer({ storage});

export const updateAvatar = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new HttpError(400, "File not provided");
        }

        const { path: tempPath, filename } = req.file;
        const finalPath = path.join(avatarsDir, filename);

        try {
            await fs.rename(tempPath, finalPath);
        } catch (moveError) {
            console.error("Error moving file:", moveError);
            await fs.unlink(tempPath);
            throw new HttpError(500, "Error saving avatar");
        }

        
        const avatarURL = `/avatars/${filename}`;       
       
        req.user.avatarURL = avatarURL;
        await req.user.save();

        res.status(200).json({ avatarURL });
    } catch (error) {
        next(error);
    }
};