import { Router } from 'express';

import { authentication } from '@/middleware/authentication';
import { editProfileHandler, getProfileHandler } from './profileController';

const router: Router = Router();

router.get('/profile', authentication, getProfileHandler);
router.post('/profile/edit', authentication, editProfileHandler);

export { router as profileRouter };
