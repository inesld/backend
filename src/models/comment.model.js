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
});


export default mongoose.model("Comment", commentSchema);