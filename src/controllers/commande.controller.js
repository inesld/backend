import Commande from '../models/commande.model.js'
import handleError from '../middlewares/errors/handleError.js'

// Create a new commande
const createCommande = async (req, res) => {
    try {
        // Check if an commande with the same date and status already exists
        const existingCommande = await Commande.findOne({
            dateCommande: req.body.dateCommande,
            status: req.body.status
        });

        if (existingCommande) {
            return handleError(res, null, "Commande with the same date and status already exists", 409); // 409 Conflict
        }

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
        const commande = await Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });

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

const commandeController = {createCommande, getOneCommande, getAllCommande, updateCommande, deleteCommande}

export default commandeController