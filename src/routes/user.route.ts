import express from 'express';
import {
	getAllUsersHandler,
	getMeHandler,
} from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();
router.use(deserializeUser, requireUser);

// Admin Get Users route
router.get('/', restrictTo('admin'), getAllUsersHandler);

// Get my info route
router.get('/me', getMeHandler);

router.get('/login', (req, res) => {
	// Simulate user login, and store the token in the session
	// req.session.token = 'yourAuthToken';
	// res.send('Logged in');
});

router.get('/secure', (req, res) => {
	// Check if the user has a valid token in their session
	// if (req.session.token === 'yourAuthToken') {
	// 	res.send('Access granted');
	// } else {
	// 	res.send('Access denied');
	// }
});

export default router;
