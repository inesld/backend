import Commande from "../models/commande.model.js";
import Product from "../models/product.model.js";
import handleError from "../middlewares/errors/handleError.js";

// Create a new commande
const createCommande = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return handleError(res, null, "You must update least one attribute", 400); // base request
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

// Update a commande by ID
const updateCommande = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
        return handleError(res, null, "You must update least one attribute", 400); // base request
      }
    const commande = await Commande.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

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

    if (commande.status !== "Cancelled") {
        return handleError(res, null, "Can not deleted this order", 409);

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
