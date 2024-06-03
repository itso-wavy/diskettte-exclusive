import { createConnection } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectToDB = async () => {
  const getURI = (db: string) =>
    `mongodb+srv://wavy:${process.env.MONGODB_PASSWORD}@blog.c5xbguq.mongodb.net/${db}?retryWrites=true&w=majority&appName=blog`;
  const usersURI = getURI('users_db');
  const postsURI = getURI('posts_db');

  try {
    const usersConnection = await createConnection(usersURI);
    const postsConnection = await createConnection(postsURI);

    return { usersConnection, postsConnection };
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
