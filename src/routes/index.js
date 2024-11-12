import { Router } from 'express';
import exampleRoutes from './example.route.js';
import userRoutes from './user.route.js';
import categoryRoutes from './category.route.js';
import commentRoutes from './comment.route.js';
import commandeRoutes from './commande.routr.js';
import productRoutes from './product.route.js';

const router = Router();

// Define routes
router.use('/examples', exampleRoutes);
router.use('/users', userRoutes);
router.use('/category', categoryRoutes);
router.use('/comment', commentRoutes);
router.use('/commande', commandeRoutes);
router.use('/product', productRoutes);
export default router;
