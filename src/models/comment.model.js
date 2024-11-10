import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    date: {
        type: Date, 
        default: Date.now, // Définit la date actuelle par défaut
    },
    text: {
        type: String, 
        trim: true,
        minlength: 1, 
        maxlength: 1000 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
});


export default mongoose.model("Comment", commentSchema);