import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectToDB = async () => {
  // const DB_TITLE = 'diskettte-exclusive';
  const DB_TITLE = 'diskettte-exclusive2';
  const DB_URI = `mongodb+srv://wavy:${process.env.MONGODB_PASSWORD}@blog.c5xbguq.mongodb.net/${DB_TITLE}?retryWrites=true&w=majority&`;

  try {
    await mongoose.connect(DB_URI);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
