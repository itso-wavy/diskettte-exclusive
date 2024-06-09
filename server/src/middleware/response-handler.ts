import { NextFunction, Response } from 'express';
import { ExpandedRequest } from './ExpandedRequestType';
import { z } from 'zod';

export const responseHandler = (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(req.body);
  } catch (err) {
    next(err);
  }
};

export const errorHandler = (
  err: any,
  _req: ExpandedRequest,
  res: Response,
  _next: NextFunction
) => {
  console.log('💙ERROR-HANDLER');

  let status, message;

  const messages: { [key: string]: string } = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: '권한이 없습니다.',
    404: '문서를 찾을 수 없습니다.',
    500: 'Internal Server Error',
  };

  if (err.name === 'CastError') {
    status = 404;
  } else if (err instanceof z.ZodError) {
    status = 404;
    message = err.flatten().fieldErrors;
  } else if (err.status) {
    status = err.status;
    message = err.message;
  } else {
    status = 500;
  }

  res.status(status).json({ error: message || messages[status] });
};
