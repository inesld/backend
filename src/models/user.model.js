import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true, 
        trim: true, // Empty fields at the beginning of the string
        minlength: 4, 
        maxlength: 30 
    },
    lasttName: {
        type: String,
        required: true, 
        trim: true, 
        minlength: 4, 
        maxlength: 50 
    },
    email: {
        type: String,
        required: [true, "Email required"], 
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"] // Validation du format email
    },
    password: {
        type: String,
        required: [true, "Password required"],
        minlength: [8, "Password should be at least 8 characters long"]  
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true, 
    }
});



export default mongoose.model("User", userSchema);