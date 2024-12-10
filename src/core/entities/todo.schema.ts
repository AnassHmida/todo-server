import mongoose, { Document, Schema, Types } from 'mongoose';
import { ITodo } from '../interfaces/todo.interface';

export interface TodoDocument extends ITodo, Document {
  userId: Types.ObjectId;
}

const TodoSchema = new Schema<TodoDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

TodoSchema.index({ userId: 1, completed: 1 });

export const Todo = mongoose.model<TodoDocument>('Todo', TodoSchema); 