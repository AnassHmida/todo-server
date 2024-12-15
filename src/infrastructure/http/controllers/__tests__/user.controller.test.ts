import { Request, Response } from 'express';
import { UserController } from '../user.controller';
import { User } from '../../../../core/entities';

describe('UserController', () => {
  let userController: UserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    userController = new UserController();
    mockRequest = {
      body: {
        username: 'testuser',
        password: 'Password123'
      }
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      mockRequest.body = {
        username: 'testuser',
        password: 'password123'
      };

      await userController.register(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });

    it('should not register user with existing username', async () => {
      await User.create({
        username: 'testuser',
        password: 'password123'
      });

      mockRequest.body = {
        username: 'testuser',
        password: 'newpassword'
      };

      await userController.register(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });

  describe('login', () => {
    it('should return 401 for invalid credentials', async () => {
      mockRequest.body = {
        username: 'nonexistent',
        password: 'wrongpassword'
      };

      await userController.login(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(401);
    });

    it('should login successfully with correct credentials', async () => {
      const testUser = await User.create({
        username: 'testuser',
        password: 'correctpassword'
      });

      mockRequest.body = {
        username: 'testuser',
        password: 'correctpassword'
      };

      await userController.login(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          user: expect.any(Object),
          token: expect.any(String)
        })
      );
    });
  });
}); 