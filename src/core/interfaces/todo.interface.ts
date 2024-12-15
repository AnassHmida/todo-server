import { Types } from 'mongoose';

export interface ITodo {
  title: string;
  completed: boolean;
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
} 