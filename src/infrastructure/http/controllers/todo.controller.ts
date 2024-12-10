import { Request, Response } from 'express';
import { Todo } from '../../../core/entities';
import { IBaseController } from './base.controller';

export class TodoController implements IBaseController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching todos' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching todo' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const todo = new Todo(req.body);
      await todo.save();
      res.status(201).json(todo);
    } catch (error) {
      res.status(400).json({ message: 'Error creating todo' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
      }
      res.json(todo);
    } catch (error) {
      res.status(400).json({ message: 'Error updating todo' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting todo' });
    }
  }
} 