import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
        trim: true, // Empty fields at the beginning of the string
        unique: true,
        minlength: 4, 
        maxlength: 100 
    }
});

// Create and export the model
export default mongoose.model("Category", categorySchema);
