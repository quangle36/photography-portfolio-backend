import { StatusCode } from 'status-code-enum';
import express, { Request, Response } from 'express';
import BlogModel, { Blog } from '../models/blog.model';
import {
	createBlog,
	deleteBlogById,
	findAllBlogs,
	findBlogById,
	updateBlogById,
} from '../services/blog.service';
import { SuccessResponse } from '../utils/response';

class BlogController {
	public createBlogHandler = async (req: Request, res: Response) => {
		try {
			const loggedInUser = res.locals.user;
			const blog = await createBlog({
				title: req.body.title,
				content: req.body.content,
				author: loggedInUser.email,
			});
			res.status(StatusCode.SuccessCreated).json(SuccessResponse(blog));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
	public getAllBlogsHandler = async (req: Request, res: Response) => {
		try {
			const blogs = await findAllBlogs();
			res.status(StatusCode.SuccessOK).json(SuccessResponse(blogs));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
	public getBlogByIdHandler = async (req: Request, res: Response) => {
		try {
			const blog = await findBlogById(req.params.id);
			res.status(StatusCode.SuccessOK).json(SuccessResponse(blog));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
	public updateBlogByIdHandler = async (req: Request, res: Response) => {
		try {
			const blog = await updateBlogById(req.params.id, req.body);
			res.status(StatusCode.SuccessOK).json(SuccessResponse(blog));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
	public deleteBlogByIdHandler = async (req: Request, res: Response) => {
		try {
			const blog = await findBlogById(req.params.id);
			if (!blog) {
				return res
					.status(StatusCode.ClientErrorBadRequest)
					.json({ error: 'Blog not found' });
			}
			const response = await deleteBlogById(req.params.id);
			res.status(StatusCode.SuccessOK).json(SuccessResponse(response));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
}

export default BlogController;
