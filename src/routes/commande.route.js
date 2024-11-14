import express from 'express';
import commandeControllers from '../controllers/commande.controller.js'
import isAuth from '../middlewares/permission/isAuth.js';
import isAdmin from '../middlewares/permission/isAdmin.js';
const router = express.Router();

// Define routes
router.post('/',isAuth, commandeControllers.createCommande);
router.get('/:id',isAuth, commandeControllers.getOneCommande);// ctrolr espace
router.get('/',isAuth, isAdmin, commandeControllers.getAllCommande);
router.put('/:id',isAuth, isAdmin, commandeControllers.updateCommande);
router.delete('/:id',isAuth, isAdmin, commandeControllers.deleteCommande);

export default router;
