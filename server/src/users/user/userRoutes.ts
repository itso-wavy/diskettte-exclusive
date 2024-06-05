import { Router } from 'express';
import { getUserInfo } from './userController';

const router: Router = Router();

router.get('/user/:username', getUserInfo);

export { router as authRouter };
