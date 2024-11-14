import express from 'express';
import isAuth from '../middlewares/permission/isAuth.js';

// Import controllers and middlewares
import commentControllers from '../controllers/comment.controller.js'
const router = express.Router();

// Define routes
router.post('/',isAuth, commentControllers.createComment);
router.get('/:id',isAuth, commentControllers.getOneComment);  // Get a comment by ID
router.get('/',isAuth, commentControllers.getAllComment);
router.put('/:id',isAuth, commentControllers.updateComment);
router.delete('/:id',isAuth,  commentControllers.deleteComment);

export default router;