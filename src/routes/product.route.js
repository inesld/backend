import express from 'express';

// Import controllers and middlewares
import productControllers from '../controllers/product.controller.js'
const router = express.Router();

// Define routes
router.post('/', productControllers.createProduct);
router.get('/:id', productControllers.getOneProduct);
router.get('/', productControllers.getAllProduct);
router.put('/:id', productControllers.updateProduct);
router.delete('/:id', productControllers.deleteProduct);

export default router;
