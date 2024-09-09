import express from 'express';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import CustomerMessageController from '../controllers/customer-message.controller';
const router = express.Router();
const customerMessageController = new CustomerMessageController();

// router.use(deserializeUser, requireUser);

router.post('/', customerMessageController.createCustomerMessageHandler);

export default router;
