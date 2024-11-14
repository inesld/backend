import express from 'express';
import isAuth from '../middlewares/permission/isAuth.js';

// Import controllers and middlewares
import productControllers from '../controllers/product.controller.js'
const router = express.Router();

// Define routes
router.post('/', isAuth, productControllers.createProduct);
router.get('/:id',isAuth, productControllers.getOneProduct);
router.get('/',isAuth, productControllers.getAllProduct);
router.put('/:id',isAuth, productControllers.updateProduct);
router.delete('/:id',isAuth, productControllers.deleteProduct);

export default router;
