import express from 'express';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import MusicController from '../controllers/music.controller';
const router = express.Router();
const musicController = new MusicController();

// router.use(deserializeUser, requireUser);

router.post('/', musicController.createMusicHandler);

router.get('/', musicController.getAllMusicsHandler);

router.get('/:id', musicController.getMusicByIdHandler);

router.put('/:id', musicController.updateMusicByIdHandler);
router.delete('/:id', musicController.deleteMusicByIdHandler);
export default router;
