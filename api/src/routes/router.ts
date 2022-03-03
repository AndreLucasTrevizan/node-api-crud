import express from 'express';
import UserController from '../controllers/UserController';
import isAdminMiddleware from '../middlewares/isAdmin';

const router = express.Router();
const userController = new UserController();

router.post('/users', userController.createUser);
router.get('/users', isAdminMiddleware, userController.listAllUsers);
router.put('/users', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/sign_in', userController.sign_in);

export default router;