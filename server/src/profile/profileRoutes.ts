import { Router } from 'express';

import { authentication } from '@/utils/authentication';
import { editProfileHandler, getProfileHandler } from './profileController';

const router: Router = Router();

router.get('/profile', authentication, getProfileHandler);
router.post('/profile/edit', authentication, editProfileHandler);

export { router as profileRouter };
