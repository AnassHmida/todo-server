import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();
const todoController = new TodoController();

router.use(auth); 

router.get('/', todoController.getAll);
router.get('/:id', todoController.getById);
router.post('/', todoController.create);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.delete);

export default router; 