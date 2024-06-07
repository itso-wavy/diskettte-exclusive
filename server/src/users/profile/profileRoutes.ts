import { Router } from 'express';

import { authentication } from '@/middleware/authentication';
import { getUserProfileDetail, editUserProfile } from './profileController';

const router: Router = Router();

router.get('/profile/:username', getUserProfileDetail);
router.get('/profile/:username/auth', authentication, getUserProfileDetail);
router.post('/profile/:username/edit', authentication, editUserProfile);

export { router as profileRouter };
