import request from 'supertest';
import app from '../../app';
import { User, Todo } from '../../core/entities';
import mongoose from 'mongoose';

describe('Error Handling', () => {
  let authToken: string;
  let testUserId: string;

  beforeEach(async () => {
    testUserId = new mongoose.Types.ObjectId().toString();
    const testUser = await User.create({
      username: 'testuser',
      password: 'Password123',
      _id: new mongoose.Types.ObjectId(testUserId)
    });
    
    authToken = testUser.generateAuthToken();
  });

  describe('Not Found Errors', () => {
    it('should return 404 with proper error format for non-existent todo', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/v1/todos/${nonExistentId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        status: 'error',
        message: 'Todo not found'
      });
    }, 10000);
  });

  describe('Validation Errors', () => {
    it('should return validation errors in consistent format', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty('errors');
    });
  });
});