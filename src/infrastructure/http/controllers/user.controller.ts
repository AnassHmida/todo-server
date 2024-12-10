import { Request, Response } from 'express';
import { User } from '../../../core/entities';

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name } = req.body;
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'Email already registered' });
        return;
      }

      const user = new User({ email, password, name });
      await user.save();

      res.status(201).json({ 
        message: 'User registered successfully',
        user: { email: user.email, name: user.name }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      res.json({ 
        message: 'Login successful',
        user: { email: user.email, name: user.name }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error during login' });
    }
  }

  async getProfile(req: Request, res: Response): Promise<void> {
    res.status(501).json({ message: 'Not implemented' });
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    res.status(501).json({ message: 'Not implemented' });
  }
} 