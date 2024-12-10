import { Request, Response } from 'express';
import { TodoController } from '../todo.controller';
import { Todo, TodoDocument } from '../../../../core/entities';
import mongoose from 'mongoose';

describe('TodoController', () => {
  let todoController: TodoController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let testUserId: string;

  beforeEach(() => {
    todoController = new TodoController();
    testUserId = new mongoose.Types.ObjectId().toString();
    mockRequest = {
      params: {},
      body: {}
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  describe('getAll', () => {
    it('should return all todos', async () => {
      await Todo.create([
        { title: 'Todo 1', userId: testUserId, completed: false },
        { title: 'Todo 2', userId: testUserId, completed: true }
      ]);

      await todoController.getAll(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return 404 for non-existent todo', async () => {
      mockRequest.params = { id: new mongoose.Types.ObjectId().toString() };
      await todoController.getById(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });

  describe('update', () => {
    it('should update todo successfully', async () => {
      const todoDocument = await Todo.create({
        title: 'Test Todo',
        userId: new mongoose.Types.ObjectId(testUserId),
        completed: false
      });

      mockRequest.params = { id: todoDocument.id };
      mockRequest.body = { completed: true };

      await todoController.update(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete todo successfully', async () => {
      const todoDocument = await Todo.create({
        title: 'Test Todo',
        userId: new mongoose.Types.ObjectId(testUserId),
        completed: false
      });

      mockRequest.params = { id: todoDocument.id };
      await todoController.delete(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
    });
  });
}); 