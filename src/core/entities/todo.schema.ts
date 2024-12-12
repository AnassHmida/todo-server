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
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

TodoSchema.index({ userId: 1, completed: 1 });

export const Todo = mongoose.model<TodoDocument>('Todo', TodoSchema); 