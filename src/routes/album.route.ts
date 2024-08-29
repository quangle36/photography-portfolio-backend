import express from 'express';
import AlbumController from '../controllers/album.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
const router = express.Router();
const albumController = new AlbumController();

// router.use(deserializeUser, requireUser);

router.post('/', albumController.createAlbumHandler);

router.get('/', albumController.getAllAlbumsHandler);

router.get('/:id', albumController.getAlbumByIdHandler);
router.put('/:id', albumController.updateAlbumByIdHandler);
router.delete('/:id', albumController.deleteAlbumByIdHandler);
export default router;
