import express from 'express';
import BlogController from '../controllers/blog.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
const router = express.Router();
const blogController = new BlogController();

router.use(deserializeUser, requireUser);

router.post('/', blogController.createBlogHandler);

router.get('/', blogController.getAllBlogsHandler);

router.get('/:id', blogController.getBlogByIdHandler);
router.put('/:id', blogController.updateBlogByIdHandler);
router.delete('/:id', blogController.deleteBlogByIdHandler);
export default router;
