import express from 'express';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import UploadController from '../controllers/upload.controller';
const router = express.Router();
const uploadController = new UploadController();
// router.use(deserializeUser, requireUser);
router.post('/upload', uploadController.uploadFileHandler);
export default router;
