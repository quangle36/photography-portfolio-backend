import express from 'express';
import MediaController from '../controllers/media.controller';
const router = express.Router();
const mediaController = new MediaController();

router.get('/files', mediaController.fetchingFilesHandler);
router.get('/files/:name', mediaController.downloadFileHandler);
export default router;
