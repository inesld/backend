import express from 'express';

// Import controllers and middlewares
import userControllers from '../controllers/user.controller.js'
const router = express.Router();

// Define routes
router.post('/', userControllers.createUser);
router.get('/:id', userControllers.getOneUser);
router.get('/', userControllers.getAllUser);
router.put('/:id', userControllers.updateUser);
router.delete('/:id', userControllers.deleteUser);


export default router;
