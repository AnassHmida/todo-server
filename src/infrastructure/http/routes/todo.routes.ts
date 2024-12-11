import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { auth } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createTodoSchema, updateTodoSchema } from '../../validation/todo.validation';
import { asyncHandler } from '../utils/async-handler';

const router = Router();
const todoController = new TodoController();

router.use(auth);

router.get('/', asyncHandler(todoController.getAll.bind(todoController)));
router.get('/:id', asyncHandler(todoController.getById.bind(todoController)));
router.post('/', validate(createTodoSchema), asyncHandler(todoController.create.bind(todoController)));
router.put('/:id', validate(updateTodoSchema), asyncHandler(todoController.update.bind(todoController)));
router.delete('/:id', asyncHandler(todoController.delete.bind(todoController)));

export default router;