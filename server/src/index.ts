import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRouter } from '@/users/userRoutes';
import { postRouter } from '@/posts/postRoutes';

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: true, // Access-Control-Allow-Origin 헤더
    credentials: true, // Access-Control-Allow-Credentials 헤더
  })
);
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(userRouter);
app.use(postRouter);

app.get('/', (_req: Request, res: Response) => {
  res.send('hello world!');
});

app.listen(PORT);
