import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Todo } from '../../../core/entities';
import { NotFoundError, ValidationError } from '../../../core/errors/app-error';

export class TodoController {
  async getAll(req: AuthRequest, res: Response): Promise<void> {
    const todos = await Todo.find({ userId: req.user!.id });
    res.json(todos);
  }

  async create(req: AuthRequest, res: Response): Promise<void> {
    const todo = new Todo({
      ...req.body,
      userId: req.user!.id
    });
    await todo.save();
    res.status(201).json(todo);
  }

  async getById(req: AuthRequest, res: Response): Promise<void> {
    const todo = await Todo.findOne({ 
      _id: req.params.id,
      userId: req.user!.id 
    });
    
    if (!todo) {
      throw new NotFoundError('Todo not found');
    }
    res.json(todo);
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!.id },
      req.body,
      { new: true }
    );

    if (!todo) {
      throw new NotFoundError('Todo not found');
    }
    res.json(todo);
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    const todo = await Todo.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user!.id 
    });

    if (!todo) {
      throw new NotFoundError('Todo not found');
    }
    res.status(204).send();
  }
}