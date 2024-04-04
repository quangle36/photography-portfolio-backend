import { StatusCode } from 'status-code-enum';
import express, { Request, Response } from 'express';
import musicModel, { Music } from '../models/music.model';
import {
	createMusic,
	deleteMusicById,
	findAllMusics,
	findMusicById,
	updateMusicById,
} from '../services/music.service';
import { SuccessResponse } from '../utils/response';
import GenreModel from '../models/genre.model';
import MusicModel from '../models/music.model';
import { findGenreByName } from '../services/genre.service';

class MusicController {
	public createMusicHandler = async (req: Request, res: Response) => {
		try {
			console.log(res.locals);
			// const loggedInUser = res.locals.user;
			const music = await createMusic({
				artists: req.body.artists,
				genre: req.body.genre,
				image: req.body.image,
				likes: req.body.likes,
				slug: req.body.slug,
				src: req.body.src,
				title: req.body.title,
			});
			res.status(StatusCode.SuccessCreated).json(SuccessResponse(music));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
	public getAllMusicsHandler = async (req: Request, res: Response) => {
		try {
			const { genre, artists,  } = req.query;
			let query;
			if (genre) {
				const genreObj = await findGenreByName(genre as string);
				query = { genre: genreObj?._id };
			} else {
				query = {};
			}
			const musics = await findAllMusics(query);
			res.status(StatusCode.SuccessOK).json(SuccessResponse(musics));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
	public getMusicByIdHandler = async (req: Request, res: Response) => {
		try {
			const music = await findMusicById(req.params.id);
			res.status(StatusCode.SuccessOK).json(SuccessResponse(music));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
	public updateMusicByIdHandler = async (req: Request, res: Response) => {
		try {
			const music = await updateMusicById(req.params.id, req.body);
			res.status(StatusCode.SuccessOK).json(SuccessResponse(music));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
	public deleteMusicByIdHandler = async (req: Request, res: Response) => {
		try {
			const music = await findMusicById(req.params.id);
			if (!music) {
				return res
					.status(StatusCode.ClientErrorBadRequest)
					.json({ error: 'music not found' });
			}
			const response = await deleteMusicById(req.params.id);
			res.status(StatusCode.SuccessOK).json(SuccessResponse(response));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
	// public getMusicsByGenreHandler = async (req: Request, res: Response) => {
	// 	const genreName = req.query.genre as string;
	// 	let musics: Music[] = [];
	// 	try {
	// 		if (!genreName) {
	// 			return res
	// 				.status(400)
	// 				.json({ error: 'Genre query parameter is required' });
	// 		}
	// 		const genre = await findGenreByName(genreName);
	// 		if (!genre) {
	// 			return res.status(StatusCode.SuccessOK).json(SuccessResponse([]));
	// 		}
	// 		// Find music by genre
	// 		musics = await MusicModel.find({ genre: genre._id }).populate('genre');
	// 		res.status(StatusCode.SuccessOK).json(SuccessResponse(musics));
	// 	} catch (error) {
	// 		return res.status(StatusCode.SuccessOK).json(SuccessResponse([]));
	// 	}
	// };
}

export default MusicController;
