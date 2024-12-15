import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../../config/config';
import { AppError } from '../../../core/errors/app-error';

export interface AuthRequest extends Request {
  user: {
    id: string;
    username: string;
  };
}

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError(401, 'Unauthorized - No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt.secret) as { id: string; username: string };

    (req as AuthRequest).user = {
      id: decoded.id,
      username: decoded.username
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(401, 'Unauthorized - Invalid token'));
    } else {
      next(error);
    }
  }
}; 