import express from 'express';
import isAuth from '../middlewares/permission/isAuth.js';

// Import controllers and middlewares
import exampleControllers from '../controllers/example.controller.js'
import {updateExampleValidation, validate} from '../middlewares/validators/example.validator.js'
const router = express.Router();

// Define route
router.post('/', exampleControllers.createExample);
router.get('/' , exampleControllers.getAllExample);
router.get('/:id', exampleControllers.getOneExample);
router.put('/:id', exampleControllers.updateExample);
router.delete('/:id',  exampleControllers.deleteExample);

export default router;
