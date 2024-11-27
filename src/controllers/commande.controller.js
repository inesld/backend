import Commande from "../models/commande.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import handleError from "../middlewares/errors/handleError.js";

// Create a new commande
const createCommande = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return handleError(res, null, "You must update least one attribute", 400); // base request
    }
            // Check if an user
            const existingUser = await User.findById(req.body.userId);
            if (!existingUser) {
                return handleError(res, null, "User is not exists", 409); // 409 Conflict
            }

    let totalPrice = 0;

    // Use Promise.all to ensure all asynchronous product retrieval operations are completed
    const productPromises = req.body.products.map(async (item) => {
      // Find the product by its productId
      const product = await Product.findById(item.productId);

      if (product) {
        // If the product is found, calculate the total price for this product (price * quantity)
        return product.price * item.quantity;
      }

      // If the product is not found, return 0 (you can handle this case differently if needed)
      return 0;
    });

    // Wait for all product price calculations to complete
    const totalPriceProducts = await Promise.all(productPromises);

    // Sum up the total prices of all products to get the final total price
    totalPrice = totalPriceProducts.reduce((acc, curr) => acc + curr, 0);

    // Set the totalPrice in the request body
    req.body.totalPrice = totalPrice;

    const newCommande = new Commande(req.body);
    await newCommande.save();
    return res.status(201).json({ payload: newCommande });
  } catch (error) {
    handleError(res, error, "Error in creating commande", 500);
  }
};

// Get a single commande by ID
const getOneCommande = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);

    if (!commande) {
      return handleError(res, null, "No commande found", 404);
    }

    return res.status(200).json({ payload: commande });
  } catch (error) {
    handleError(res, error, "Error in getting one commande", 500);
  }
};

// Get all commandes
const getAllCommande = async (req, res) => {
  try {
    const commandes = await Commande.find();

    if (commandes.length === 0) {
      return res.status(204).send();
    }

    return res.status(200).json({ payload: commandes });
  } catch (error) {
    handleError(res, error, "Error in getting all commandes", 500);
  }
};

const updateCommande = async (req, res) => {
  try {
    // Ensure that at least one field is being updated
    if (Object.keys(req.body).length === 0) {
      return handleError(res, null, "You must update at least one attribute", 400); 
    }

    // Optional: Add validation for specific fields in req.body
    if (req.body.products) {
      // Ensure that each product has a valid productId and quantity
      for (const product of req.body.products) {
        if (!product.productId || !product.quantity || product.quantity < 1) {
          return handleError(res, null, "Each product must have a valid productId and quantity greater than 0", 400);
        }
      }
    }

    // Calculate total price if not provided
    if (req.body.products) {
      let totalPrice = 0;
      for (const product of req.body.products) {
        const productData = await Product.findById(product.productId);
        if (productData) {
          totalPrice += productData.price * product.quantity;
        }
      }
      req.body.totalPrice = totalPrice; // Set the total price in the request body
    }

    // Perform the update
    const commande = await Commande.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
    });

    // If no commande is found, return a 404 error
    if (!commande) {
      return handleError(res, null, "No commande found", 404);
    }

    return res.status(200).json({ payload: commande });
  } catch (error) {
    handleError(res, error, "Error in updating commande", 500);
  }
};


// Delete a single commande by ID
const deleteCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndDelete(req.params.id);

    if (!commande) {
      return handleError(res, null, "No commande found", 404);
    }

    return res.status(200).json({ payload: "Commande deleted" });
  } catch (error) {
    handleError(res, error, "Error in deleting commande", 500);
  }
};

const commandeController = {
  createCommande,
  getOneCommande,
  getAllCommande,
  updateCommande,
  deleteCommande,
};

export default commandeController;
