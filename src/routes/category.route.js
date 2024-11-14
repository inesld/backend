import express from 'express';
import isAuth from '../middlewares/permission/isAuth.js';

// Import controllers and middlewares
import categoryControllers from '../controllers/category.controller.js'
import isAdmin from '../middlewares/permission/isAdmin.js';

const router = express.Router();

// Define routes
router.post('/',isAuth, isAdmin, categoryControllers.createCategory);
router.get('/:id',isAuth, categoryControllers.getOneCategory);// ctrolr espace
router.get('/',isAuth, categoryControllers.getAllCategory);// ctrolr espace
router.put('/:id',isAuth, isAdmin, categoryControllers.updateCategory);
router.delete('/:id',isAuth, isAdmin, categoryControllers.deleteCategory);



export default router;
