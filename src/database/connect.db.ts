import mongoose from 'mongoose';

export const connectDB = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log('database setup correctly '); //setup logger
  } catch {
    console.log('An error occurred ');
  }
};
