import express from 'express';

// Import controllers and middlewares
import commentControllers from '../controllers/comment.controller.js'
const router = express.Router();

// Define routes
router.post('/', commentControllers.createComment);
router.get('/:id', commentControllers.getOneComment);  // Get a comment by ID
router.get('/', commentControllers.getAllComment);
router.put('/:id', commentControllers.updateComment);
router.delete('/:id', commentControllers.deleteComment);

export default router;