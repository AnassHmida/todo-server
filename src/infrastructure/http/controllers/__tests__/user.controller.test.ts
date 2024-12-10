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
      body: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      await userController.register(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });

    it('should not register user with existing email', async () => {
      await User.create({
        email: 'test@example.com',
        password: 'password123',
      });

      mockRequest.body = {
        email: 'test@example.com',
        password: 'newpassword',
      };

      await userController.register(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });

  describe('login', () => {
    it('should return 401 for invalid credentials', async () => {
      mockRequest.body = {
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      };

      await userController.login(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(401);
    });

    it('should login successfully with correct credentials', async () => {
      const testUser = await User.create({
        email: 'test@example.com',
        password: 'correctpassword',
        name: 'Test User'
      });

      mockRequest.body = {
        email: 'test@example.com',
        password: 'correctpassword'
      };

      await userController.login(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Login successful'
        })
      );
    });
  });
}); 