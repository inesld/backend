import express from 'express';
import isAuth from '../middlewares/permission/isAuth.js';

// Import controllers and middlewares
import exampleControllers from '../controllers/example.controller.js'
import {updateExampleValidation, validate} from '../middlewares/validators/example.validator.js'
const router = express.Router();

// Define route
router.post('/',isAuth, exampleControllers.createExample);
router.get('/', isAuth, exampleControllers.getAllExample);
router.get('/:id',isAuth, exampleControllers.getOneExample);
router.put('/:id',isAuth, exampleControllers.updateExample);
router.delete('/:id',isAuth,  exampleControllers.deleteExample);

export default router;
