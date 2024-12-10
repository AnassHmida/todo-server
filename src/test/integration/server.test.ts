import request from 'supertest';
import app from '../../app';
import { Todo } from '../../core/entities';
import mongoose from 'mongoose';

describe('Server Integration Tests', () => {
  let testUserId: string;

  beforeEach(async () => {
    testUserId = new mongoose.Types.ObjectId().toString();
    await Todo.deleteMany({}); 
  });

  describe('Todo Endpoints', () => {
    it('should create a new todo', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .send({
          title: 'Test Todo',
          userId: testUserId,
          completed: false
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'Test Todo');
    });

    it('should get all todos', async () => {

      await Todo.create([
        { title: 'Todo 1', userId: testUserId, completed: false },
        { title: 'Todo 2', userId: testUserId, completed: true }
      ]);

      const response = await request(app)
        .get('/api/v1/todos');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
    });
  });
}); 