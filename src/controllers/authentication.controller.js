import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import handleError from '../middlewares/errors/handleError.js';


//  signup
const signup = async (req, res) => {
    try {
        const { firstName, lasttName, email, password, gender, isAdmin } = req.body;

        // Check if an user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return handleError(res, null, "User with this email already exists", 409);
        }

        // Hashage password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const newUser = new User({
            firstName,
            lasttName,
            email,
            password: hashedPassword,
            gender,
            isAdmin
        });

        await newUser.save();

        // generate token JWT
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, isAdmin: newUser.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(201).json({ token, payload: newUser });
    } catch (error) {
        handleError(res, error, "Error in signup", 500);
    }
};

// Login 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if an user with the same email already exists
        const user = await User.findOne({ email });
        if (!user) {
            return handleError(res, null, "Password or email invalid", 401);
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return handleError(res, null, " Password or email invalid", 401);
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token, payload: user });
    } catch (error) {
        handleError(res, error, "Error in login", 500);
    }
};


// logout
const logout = (req, res) => {
    try {
        res.clearCookie('token');

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        handleError(res, error, "Error to logout", 500);
    }
};


const authController = {signup, login, logout}
export default authController;

