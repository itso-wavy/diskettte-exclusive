import { Router } from 'express';
import {
  registerHandler,
  loginHandler,
  refreshTokenHandler,
} from './authController';

const router: Router = Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/token-refresh', refreshTokenHandler);

export { router as authRouter };
