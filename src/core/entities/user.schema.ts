import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export interface UserDocument extends IUser, Document {}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = mongoose.model<UserDocument>('User', UserSchema); 