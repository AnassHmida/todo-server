import { Request, Response } from 'express';
import { Todo } from '../../../core/entities';
import { AuthRequest } from '../middleware/auth.middleware';

export class TodoController {
  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const todos = await Todo.find({ userId: req.user!.id });
      res.json(todos);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching todos' });
    }
  }

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const todo = new Todo({
        ...req.body,
        userId: req.user!.id
      });
      await todo.save();
      res.status(201).json(todo);
    } catch (error) {
      res.status(400).json({ message: 'Error creating todo' });
    }
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const todo = await Todo.findOneAndUpdate(
        { _id: req.params.id, userId: req.user!.id },
        req.body,
        { new: true }
      );
      if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
      }
      res.json(todo);
    } catch (error) {
      res.status(400).json({ message: 'Error updating todo' });
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const todo = await Todo.findOneAndDelete({ 
        _id: req.params.id, 
        userId: req.user!.id 
      });
      if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: 'Error deleting todo' });
    }
  }

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const todo = await Todo.findOne({ 
        _id: req.params.id,
        userId: req.user!.id 
      });
      
      if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
      }
      res.json(todo);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching todo' });
    }
  }
} 