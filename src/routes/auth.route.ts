import express from 'express';
import {
	loginHandler,
	logoutHandler,
	refreshAccessTokenHandler,
	registerHandler,
} from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();

// Register user route
router.post('/register', validate(createUserSchema), registerHandler);

// Login user route
router.post('/login', validate(loginUserSchema), loginHandler);

// Refresh access toke route
router.post('/refresh', refreshAccessTokenHandler);

router.use(deserializeUser, requireUser);

// Logout User
router.post('/logout', logoutHandler);
export default router;
