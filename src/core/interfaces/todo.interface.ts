import { Types } from 'mongoose';

export interface ITodo {
  title: string;
  description?: string;
  completed: boolean;
  userId: Types.ObjectId;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
} 