import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { auth } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createTodoSchema, updateTodoSchema } from '../../validation/todo.validation';
import { asyncHandler } from '../utils/async-handler';

const router = Router();
const todoController = new TodoController();

/**
 * @swagger
 * tags:
 *   - name: Todos
 *     description: Todo management endpoints
 * 
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - completed
 *         - userId
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *           minLength: 1
 *           maxLength: 100
 *         completed:
 *           type: boolean
 *           default: false
 *         userId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateTodoInput:
 *       type: object
 *       required:
 *         - title
 *         - completed
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           maxLength: 100
 *         completed:
 *           type: boolean
 *     UpdateTodoInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           maxLength: 100
 *         completed:
 *           type: boolean
 *         dueDate:
 *           type: string
 *           format: date-time
 * 
 * /todos:
 *   get:
 *     tags: [Todos]
 *     summary: Get all todos for the authenticated user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *   post:
 *     tags: [Todos]
 *     summary: Create a new todo
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTodoInput'
 *     responses:
 *       201:
 *         description: Created todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 * 
 * /todos/{id}:
 *   get:
 *     tags: [Todos]
 *     summary: Get a todo by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *   put:
 *     tags: [Todos]
 *     summary: Update a todo
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTodoInput'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *   delete:
 *     tags: [Todos]
 *     summary: Delete a todo
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Todo deleted successfully
 */

router.use(auth);
router.get('/', asyncHandler(todoController.getAll.bind(todoController)));
router.post('/', validate(createTodoSchema), asyncHandler(todoController.create.bind(todoController)));
router.get('/:id', asyncHandler(todoController.getById.bind(todoController)));
router.put('/:id', validate(updateTodoSchema), asyncHandler(todoController.update.bind(todoController)));
router.delete('/:id', asyncHandler(todoController.delete.bind(todoController)));

export default router;