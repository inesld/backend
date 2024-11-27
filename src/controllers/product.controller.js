// Import model
import Product from "../models/product.model.js";
import handleError from "../middlewares/errors/handleError.js";
import Category from "../models/category.model.js";

// create a new product
const createProduct = async (req, res) => {
  try {
    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({ name: req.body.name });
    const existingCategory = await Category.findById(req.body.category.id);

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
    let product = await Product.findById(req.params.id) // Inclure seulement le champ 'name' de la catégorie

    if (!product) {
      return handleError(res, null, "No product found", 404); // 404 Not Found
    }

    const category = await Category.findById(product.category.id)
console.log("category",category);
    if (!category) {
      return handleError(res, null, "No product found with this category", 404); // 404 Not Found
    }

    product.category.name = category.name 

    return res.status(200).json({ payload: product });
  } catch (error) {
    handleError(res, error, "Error in getting product by ID", 500); // 500 Server Error
  }
};

// Get all products
const getAllProduct = async (req, res) => {
  try {
    // Récupérer tous les produits
    let products = await Product.find();

    if (products.length === 0) {
      return res.status(204).send(); // No content
    }

    // Parcourir chaque produit pour ajouter le nom de la catégorie
    const productsWithCategory = await Promise.all(
      products.map(async (product) => {
        const category = await Category.findById(product.category.id);
        if (category) {
          product = product.toObject(); // Convertir le document Mongoose en objet JavaScript
          product.category = { id: category._id, name: category.name }; // Ajouter la catégorie
        }
        return product;
      })
    );

    return res.status(200).json({ payload: productsWithCategory });
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

    const existingCategory = await Category.findById(req.body.categoryId);

    if (!existingCategory) {
      return handleError(res, null, "Category is Not exist", 404);
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
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrr", error);
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
