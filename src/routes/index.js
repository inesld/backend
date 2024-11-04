import { Router } from 'express';
import exampleRoutes from './example.route.js';


const router = Router();

// Define routes
router.use('/examples', exampleRoutes);


export default router;
