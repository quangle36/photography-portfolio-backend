import express from 'express';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import GenreController from '../controllers/genre.controller';
const router = express.Router();
const genreController = new GenreController();

router.use(deserializeUser, requireUser);

router.post('/', genreController.createGenreHandler);

router.get('/', genreController.getAllGenresHandler);

router.get('/:id', genreController.getGenreByIdHandler);
router.put('/:id', genreController.updateGenreByIdHandler);
router.delete('/:id', genreController.deleteGenreByIdHandler);
export default router;
