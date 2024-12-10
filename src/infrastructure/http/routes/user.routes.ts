import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validate } from '../middleware/validate.middleware';
import { registerUserSchema, loginUserSchema } from '../../validation/user.validation';

const router = Router();
const userController = new UserController();

router.post('/register', validate(registerUserSchema), userController.register);
router.post('/login', validate(loginUserSchema), userController.login);

export default router;