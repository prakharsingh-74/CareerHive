import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !!email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all fields.",
                success: false
            });
        };
        const user = await UserActivation.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'user already exists',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        })
        return res.status(201).json({
            message: "User created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all fields.",
                success: false
            });
        };
        let user = await user.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "incorrect email or password",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "incorrect email or password",
                success: false,
            })
        }

        if (role != user.role) {
            return res.status(400).json({
                message: "account doesn't exit with current role",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY)

        user = {
            userId: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, saneSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateprofile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file
        if (!fullname || !!email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({
                message: "Please fill in all fields.",
                success: false
            });
        };

        // cloudinary

        const skillsArray = skills.split(",");
        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        //updating data
        user.fullname = fullname,
            user.email = email,
            user.phoneNumber = phoneNumber,
            user.profile.bio = bio,
            user.profile.skills = skillsArray


        // resume

        await user.save();

        user = {
            userId: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "profile updated successfully",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}