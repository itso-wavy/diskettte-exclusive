import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRouter } from '@/users/userRoutes';
import { postRouter } from '@/posts/postRoutes';
import { responseHandler, errorHandler } from '@/middleware/response-handler';

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

app.use(responseHandler);
app.use(errorHandler);

app.listen(PORT);
