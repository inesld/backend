import express from 'express';
import userControllers from '../controllers/user.controller.js'
import isAuth from '../middlewares/permission/isAuth.js';
import isAdmin from '../middlewares/permission/isAdmin.js';
const router = express.Router();

router.post('/',isAuth, userControllers.createUser);
router.get('/:id', isAuth, isAdmin, userControllers.getOneUser);
router.get('/',isAuth, isAdmin, userControllers.getAllUser);
router.put('/:id',isAuth, userControllers.updateUser);
router.delete('/:id',isAuth,isAdmin, userControllers.deleteUser);


export default router;
