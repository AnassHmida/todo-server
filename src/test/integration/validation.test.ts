import request from 'supertest';
import app from '../../app';
import { User } from '../../core/entities';
import mongoose from 'mongoose';

describe('Todo Validation', () => {
  let authToken: string;
  let testUserId: string;

  beforeEach(async () => {
    testUserId = new mongoose.Types.ObjectId().toString();
    const testUser = await User.create({
      email: 'test@example.com',
      password: 'Password123',
      name: 'Test User',
      _id: new mongoose.Types.ObjectId(testUserId)
    });
    
    authToken = testUser.generateAuthToken();
  });

  describe('POST /api/v1/todos', () => {
    it('should reject empty title', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: '',
          completed: false
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors[0].message).toContain('Title is required');
    });

    it('should reject title longer than 100 characters', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'a'.repeat(101),
          completed: false
        });

      expect(response.status).toBe(400);
      expect(response.body.errors[0].message).toContain('less than 100 characters');
    });

    it('should reject invalid date format', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Valid Title',
          dueDate: 'invalid-date'
        });

      expect(response.status).toBe(400);
      expect(response.body.errors[0].field).toContain('dueDate');
    });
  });

  describe('PUT /api/v1/todos/:id', () => {
    it('should reject invalid todo ID format', async () => {
      const response = await request(app)
        .put('/api/v1/todos/invalid-id')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Updated Title'
        });

      expect(response.status).toBe(400);
      expect(response.body.errors[0].message).toContain('Invalid todo ID');
    });
  });
});