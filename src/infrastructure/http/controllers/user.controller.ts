import { Request, Response } from 'express';
import { User } from '../../../core/entities';

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name } = req.body;
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'Email already exists' });
        return;
      }

      const user = new User({ email, password, name });
      await user.save();

      const token = user.generateAuthToken();
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ message: 'Error registering user' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

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