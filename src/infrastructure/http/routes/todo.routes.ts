import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { auth } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createTodoSchema, updateTodoSchema } from '../../validation/todo.validation';

const router = Router();
const todoController = new TodoController();

router.use(auth);

router.get('/', todoController.getAll);
router.get('/:id', todoController.getById);
router.post('/', validate(createTodoSchema), todoController.create);
router.put('/:id', validate(updateTodoSchema), todoController.update);
router.delete('/:id', todoController.delete);

export default router;