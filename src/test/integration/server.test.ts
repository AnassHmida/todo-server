import request from 'supertest';
import app from '../../app';
import { Todo, User } from '../../core/entities';
import mongoose from 'mongoose';

describe('Server Integration Tests', () => {
  let authToken: string;
  let testUserId: string;

  beforeEach(async () => {
    testUserId = new mongoose.Types.ObjectId().toString();
    const testUser = await User.create({
      username: 'testuser',
      password: 'password123',
      _id: new mongoose.Types.ObjectId(testUserId)
    });
    
    authToken = testUser.generateAuthToken();
    await Todo.deleteMany({});
  });

  describe('Todo Endpoints', () => {
    it('should create a new todo with auth', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Todo',
          completed: false
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'Test Todo');
      expect(response.body.userId).toBe(testUserId);
    });

    it('should not create todo without auth', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .send({
          title: 'Test Todo',
          completed: false
        });

      expect(response.status).toBe(401);
    });

    it('should get only user\'s todos', async () => {

      await Todo.create([
        { title: 'Todo 1', userId: testUserId, completed: false },
        { title: 'Todo 2', userId: testUserId, completed: true }
      ]);


      const anotherUserId = new mongoose.Types.ObjectId();
      await Todo.create({
        title: 'Another User Todo',
        userId: anotherUserId,
        completed: false
      });

      const response = await request(app)
        .get('/api/v1/todos')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
      expect(response.body.every((todo: any) => todo.userId === testUserId)).toBe(true);
    });
  });
}); 