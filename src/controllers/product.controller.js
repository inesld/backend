// Import model
import Product from "../models/product.model.js";
import handleError from "../middlewares/errors/handleError.js";
import Category from "../models/category.model.js";

// create a new product
const createProduct = async (req, res) => {
  try {
    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({ name: req.body.name });
    const existingCategory = await Category.findById(req.body.categoryId);

    if (!existingCategory) {
      return handleError(res, null, "Category is Not exist", 404);
    }

    if (existingProduct) {
      return handleError(
        res,
        null,
        "Product with this name already exists",
        409
      ); // 409 Conflict
    }

    const newProduct = new Product(req.body);
    await newProduct.save();
    return res.status(201).json({ payload: newProduct });
  } catch (error) {
    handleError(res, error, "Error in creating product", 500);
  }
};

// Get a single product by ID
const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Find product by ID from URL params

    if (!product) {
      return handleError(res, null, "No product found", 404); // 404 Not Found
    }

    return res.status(200).json({ payload: product });
  } catch (error) {
    handleError(res, error, "Error in getting product by ID", 500); // 500 Server Error
  }
};

// Get all products
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(204).send(); // No content
    }

    return res.status(200).json({ payload: products });
  } catch (error) {
    handleError(res, error, "Error in getting all products", 500); // 500 Server Error
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return handleError(res, null, "You must update least one attribute", 400); // base request
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return handleError(res, null, "No product found", 404);
    }

    return res.status(200).json({ payload: product });
  } catch (error) {
    handleError(res, error, "Error in updating product", 500);
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return handleError(res, null, "No product found", 404);
    }

    return res.status(200).json({ payload: "Product deleted" });
  } catch (error) {
    handleError(res, error, "Error in deleting product", 500);
  }
};

const productController = {
  createProduct,
  getOneProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};

export default productController;
