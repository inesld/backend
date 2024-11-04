import express from 'express';

// Import controllers and middlewares
import exampleControllers from '../controllers/example.controller.js'
import {updateExampleValidation, validate} from '../middlewares/validators/example.validator.js'
const router = express.Router();

// Define routes
router.post('/', exampleControllers.createExample);
router.get('/', exampleControllers.getAllExample);
router.get('/:id', exampleControllers.getOneExample);
router.put('/:id', updateExampleValidation, validate, exampleControllers.updateExample);
router.delete('/:id', exampleControllers.deleteExample);

export default router;
