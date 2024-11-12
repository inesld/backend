import mongoose from "mongoose";
const commandeSchema = new mongoose.Schema({
    dateCommande: {
        type: Date,
        default: Date.now,  // Default to current date and time
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        required: true
        },
        quantity: {
            type: Number,
        }
    }],
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',  // Default status is 'Pending'
    },
    totalPrice: {
        type: Number,
        required: true,
        min: [0, 'Total price must be a positive number']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, 
{ timestamps: true });  // Automatically add createdAt and updatedAt fields

export default mongoose.model("Commande", commandeSchema);