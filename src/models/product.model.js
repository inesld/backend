import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 1,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 500,
    },
    image: {
      type: String,
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbdnFFmKNoG9BFo8XlFQouT2dveelgkNhu8Q&s", // Default image URL
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    store: {
      type: Number,
      required: true,
      default: 0, // Stock initial
    },
    available: {
      type: Boolean,
      default: function () {
        return this.store > 0;
      },
    },
    category: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", // Reference to the Category model
        required: true,
      },
      name: {
        type: String,
      },
    }}
); // Automatically adds createdAt and updatedAt fields

// Create and export the Product model
export default mongoose.model("Product", productSchema);
