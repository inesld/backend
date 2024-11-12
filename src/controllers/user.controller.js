import User from '../models/user.model.js'
import handleError from '../middlewares/errors/handleError.js'

// create a new user
const createUser = async (req, res) => {
    try {
        // Check if an user with the same email already exists
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return handleError(res, null, "User with this email already exists", 409); // 409 Conflict
        }

        const newUser = new User(req.body);
        await newUser.save();
        return res.status(201).json({ payload: newUser });
    } catch (error) {
        handleError(res, error, "Error in creating User", 500);
    }
};

// Get a single user by ID
const getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return handleError(res, null, "No user found", 404); // 404 Not Found
        }

        return res.status(200).json({ payload: user });
    } catch (error) {
        handleError(res, error, "Error in getting one user", 500); // 500 server error
    }
};

// Get all users
const getAllUser = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(204).send(); // No content
        }

        return res.status(200).json({ payload: users });
    } catch (error) {
        handleError(res, error, "Error in getting all users", 500);
    }
};

// Update an user by ID
const updateUser = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return handleError(res, null, "You must update least one attribute", 400); // base request
        }
        
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!user) {
            return handleError(res, null, "No data found", 404);
        }

        return res.status(200).json({ payload: user });
    } catch (error) {
        handleError(res, error, "Error in updating user", 500);
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return handleError(res, null, "No user found", 404);
        }

        return res.status(200).json({ payload: "User deleted" });
    } catch (error) {
        handleError(res, error, "Error in deleting user", 500);
    }
};

const userController = {createUser, getOneUser, getAllUser, updateUser, deleteUser}

export default userController