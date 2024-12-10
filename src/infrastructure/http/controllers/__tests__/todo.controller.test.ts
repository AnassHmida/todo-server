import { Request, Response } from 'express';
import { TodoController } from '../todo.controller';
import { Todo, TodoDocument } from '../../../../core/entities';
import mongoose from 'mongoose';
import { AuthRequest } from '../../../../infrastructure/http/middleware/auth.middleware';

describe('TodoController', () => {
  let todoController: TodoController;
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;
  let testUserId: string;

  beforeEach(() => {
    todoController = new TodoController();
    testUserId = new mongoose.Types.ObjectId().toString();
    mockRequest = {
      params: {},
      body: {},
      user: { 
        id: testUserId,
        email: 'test@example.com'
      }
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

      await todoController.getAll(mockRequest as AuthRequest, mockResponse as Response);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return todo if it exists and belongs to user', async () => {
      const todoDocument = await Todo.create({
        title: 'Test Todo',
        userId: testUserId,
        completed: false
      });

      mockRequest.params = { id: todoDocument.id };
      await todoController.getById(mockRequest as AuthRequest, mockResponse as Response);
      
      const receivedTodo = (mockResponse.json as jest.Mock).mock.calls[0][0];
      expect(receivedTodo._id.toString()).toBe(todoDocument.id);
      expect(receivedTodo.title).toBe('Test Todo');
      expect(receivedTodo.userId.toString()).toBe(testUserId);
      expect(receivedTodo.completed).toBe(false);
      expect(receivedTodo.createdAt).toBeDefined();
      expect(receivedTodo.updatedAt).toBeDefined();
    });

    it('should return 404 for todo belonging to different user', async () => {
      const otherUserId = new mongoose.Types.ObjectId().toString();
      const todoDocument = await Todo.create({
        title: 'Other User Todo',
        userId: otherUserId,
        completed: false
      });

      mockRequest.params = { id: todoDocument.id };
      await todoController.getById(mockRequest as AuthRequest, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });

  describe('update', () => {
    it('should update todo successfully', async () => {
      const todoDocument = await Todo.create({
        title: 'Test Todo',
        userId: testUserId,
        completed: false
      });

      mockRequest.params = { id: todoDocument.id };
      mockRequest.body = { completed: true };

      await todoController.update(mockRequest as AuthRequest, mockResponse as Response);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete todo successfully', async () => {
      const todoDocument = await Todo.create({
        title: 'Test Todo',
        userId: testUserId,
        completed: false
      });

      mockRequest.params = { id: todoDocument.id };
      await todoController.delete(mockRequest as AuthRequest, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
    });
  });
}); 