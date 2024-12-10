import mongoose from 'mongoose';
import { config } from '../../config/config';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.database.uri);
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
}); 