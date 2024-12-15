import { Request, Response } from 'express';
import { User } from '../../../core/entities';

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      
      console.log('Registration attempt:', { 
        username, 
        passwordLength: password?.length,
        body: req.body 
      });
      
      if (!username || !password) {
        res.status(400).json({ 
          message: 'Username and password are required',
          received: { username: !!username, password: !!password }
        });
        return;
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        res.status(400).json({ 
          message: 'Username already exists',
          username
        });
        return;
      }

      const user = new User({ username, password });
      await user.save();

      const token = user.generateAuthToken();
      res.status(201).json({ user, token });
    } catch (error) {
      console.error('Registration error:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        body: req.body
      });

      res.status(400).json({ 
        message: 'Error registering user',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user || !(await user.comparePassword(password))) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const token = user.generateAuthToken();
      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ message: 'Error logging in' });
    }
  }

  async getProfile(req: Request, res: Response): Promise<void> {
    res.status(501).json({ message: 'Not implemented' });
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    res.status(501).json({ message: 'Not implemented' });
  }
} 