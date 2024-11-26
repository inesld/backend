import express from 'express';
import userControllers from '../controllers/user.controller.js'
import isAuth from '../middlewares/permission/isAuth.js';
import isAdmin from '../middlewares/permission/isAdmin.js';
const router = express.Router();

router.post('/', userControllers.createUser);
router.get('/:id', userControllers.getOneUser);
router.get('/', userControllers.getAllUser);
router.put('/:id', userControllers.updateUser);
router.delete('/:id', userControllers.deleteUser);


export default router;
