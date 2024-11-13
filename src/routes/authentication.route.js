import express from 'express';

// Import controllers and middlewares
import authController from '../controllers/authentication.controller.js'
const router = express.Router();

// Define routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);




export default router;
