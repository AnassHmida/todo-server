import { Router } from 'express';
import todoRoutes from './todo.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/todos', todoRoutes);
router.use('/users', userRoutes);

export default router; 