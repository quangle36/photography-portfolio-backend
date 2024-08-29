import { StatusCode } from 'status-code-enum';
import express, { Request, Response } from 'express';
import AlbumModel, { Album } from '../models/album.model';
import {
	createAlbum,
	deleteAlbumById,
	findAllAlbums,
	findAlbumById,
	updateAlbumById,
} from '../services/album.service';
import { SuccessResponse } from '../utils/response';
import { File } from 'buffer';
import cloudinary from '../../config/cloudinary';

class AlbumController {
	public createAlbumHandler = async (req: Request, res: Response) => {
		try {
			// console.log(res.locals);
			// const loggedInUser = res.locals.user;
			const files = req.files as Express.Multer.File[];
			const imageFiles = files.filter((file) => file.originalname !== '');
			const imageUploadPromises = [];
			for (const image of imageFiles) {
				const imageBuffer = await image.buffer;
				const imageArray = Array.from(new Uint8Array(imageBuffer));
				const imageData = Buffer.from(imageArray);

				//Convert the image data to base64
				const imageBase64 = imageData.toString('base64');

				//Make request to upload to Cloudinary
				const result = await cloudinary.uploader.upload(
					`data:image/png;base64,${imageBase64}`,
					{
						folder: `photo-portfolio/albums/${req.body.folderName}`,
					}
				);
				imageUploadPromises.push(result.secure_url);
			}
			const uploadedImages = await Promise.all(imageUploadPromises);
			const album = await createAlbum({
				name: req.body.name,
				coverImageSrc: uploadedImages[0],
				date: req.body.date,
				location: req.body.location,
				images: uploadedImages,
				folderName: req.body.folderName,
			});
			res.status(StatusCode.SuccessCreated).json(SuccessResponse(album));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
	public getAllAlbumsHandler = async (req: Request, res: Response) => {
		try {
			const albums = await findAllAlbums();
			res.status(StatusCode.SuccessOK).json(SuccessResponse(albums));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
	public getAlbumByIdHandler = async (req: Request, res: Response) => {
		try {
			const album = await findAlbumById(req.params.id);
			res.status(StatusCode.SuccessOK).json(SuccessResponse(album));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
	public updateAlbumByIdHandler = async (req: Request, res: Response) => {
		try {
			const album = await updateAlbumById(req.params.id, req.body);
			res.status(StatusCode.SuccessOK).json(SuccessResponse(album));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
	public deleteAlbumByIdHandler = async (req: Request, res: Response) => {
		try {
			const album = await findAlbumById(req.params.id);
			if (!album) {
				return res
					.status(StatusCode.ClientErrorBadRequest)
					.json({ error: 'Album not found' });
			}
			const response = await deleteAlbumById(req.params.id);
			res.status(StatusCode.SuccessOK).json(SuccessResponse(response));
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
}

export default AlbumController;
