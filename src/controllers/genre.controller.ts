import { StatusCode } from 'status-code-enum';
import express, { NextFunction, Request, Response } from 'express';
import genreModel, { Genre } from '../models/genre.model';
import {
	createGenre,
	deleteGenreById,
	findAllGenres,
	findGenreById,
	updateGenreById,
} from '../services/genre.service';
import { SuccessResponse } from '../utils/response';

class GenreController {
	public createGenreHandler = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			console.log(res.locals);
			// const loggedInUser = res.locals.user;
			const genre = await createGenre({
				name: req.body.name,
				image: req.body.image,
			});
			res.status(StatusCode.SuccessCreated).json(SuccessResponse(genre));
		} catch (err: any) {
			if (err.code === 11000) {
				return res.status(409).json({
					status: 'fail',
					message: 'Genre already exist',
				});
			}
			next(err);
		}
	};
	public getAllGenresHandler = async (req: Request, res: Response) => {
		try {
			const genres = await findAllGenres();
			res.status(StatusCode.SuccessOK).json(SuccessResponse(genres));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
	public getGenreByIdHandler = async (req: Request, res: Response) => {
		try {
			const genre = await findGenreById(req.params.id);
			res.status(StatusCode.SuccessOK).json(SuccessResponse(genre));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
	public updateGenreByIdHandler = async (req: Request, res: Response) => {
		try {
			const genre = await updateGenreById(req.params.id, req.body);
			res.status(StatusCode.SuccessOK).json(SuccessResponse(genre));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
	public deleteGenreByIdHandler = async (req: Request, res: Response) => {
		try {
			const genre = await findGenreById(req.params.id);
			if (!genre) {
				return res
					.status(StatusCode.ClientErrorBadRequest)
					.json({ error: 'genre not found' });
			}
			const response = await deleteGenreById(req.params.id);
			res.status(StatusCode.SuccessOK).json(SuccessResponse(response));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
}

export default GenreController;
