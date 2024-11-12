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
      default: "https://via.placeholder.com/150", // Default image URL
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
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category model
      required: true, // Set to true if each product must have a category
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// Create and export the Product model
export default mongoose.model("Product", productSchema);
