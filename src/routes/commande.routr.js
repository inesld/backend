import express from 'express';

// Import controllers and middlewares
import commandeControllers from '../controllers/commande.controller.js'
const router = express.Router();

// Define routes
router.post('/', commandeControllers.createCommande);
router.get('/:id', commandeControllers.getOneCommande);// ctrolr espace
router.get('/', commandeControllers.getAllCommande);
router.put('/:id', commandeControllers.updateCommande);
router.delete('/:id', commandeControllers.deleteCommande);

export default router;
