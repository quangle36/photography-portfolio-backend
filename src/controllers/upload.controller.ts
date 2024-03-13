import express, { Request, Response } from 'express';
import StatusCode from 'status-code-enum';
import { GridFSBucket } from 'mongodb';
import { SuccessResponse } from '../utils/response';
import connectGFS from '../utils/connectGFS';
import { MongoClient } from 'mongodb';
import { dbUrl } from '../utils/constants';
import config from 'config';
const mongoClient = new MongoClient(dbUrl);
const baseUrl = 'http://localhost:8000/api/upload/files/';
class UploadController {
	public async uploadFileHandler(req: Request, res: Response) {
		// ... code to upload file
		// res.status(StatusCode.SuccessOK).json(SuccessResponse(req.file));
		const { uploadFilesMiddleware } = connectGFS();
		try {
			await uploadFilesMiddleware(req, res);
			console.log(req.files);

			if (Number(req.files?.length) <= 0) {
				return res
					.status(400)
					.send({ message: 'You must select at least 1 file.' });
			}

			return res.status(200).send({
				message: 'Files have been uploaded.',
			});
		} catch (error: any) {
			console.log(error);
			if (error.code === 'LIMIT_UNEXPECTED_FILE') {
				return res.status(StatusCode.ClientErrorBadRequest).send({
					message: 'Too many files to upload.',
				});
			}
			return res.status(StatusCode.ServerErrorInternal).send({
				message: `Error when trying upload many files: ${error}`,
			});
		}
	}
	public async downloadFileHandler(req: Request, res: Response) {
		// ... code to delete file
		try {
			await mongoClient.connect();

			const database = mongoClient.db(process.env.DATABASE);
			const bucket = new GridFSBucket(database, {
				bucketName: config.get('bucketName'),
			});

			let downloadStream = bucket.openDownloadStreamByName(req.params.name);

			downloadStream.on('data', function (data) {
				return res.status(200).write(data);
			});

			downloadStream.on('error', function (err) {
				return res.status(404).send({ message: 'Cannot download the Image!' });
			});

			downloadStream.on('end', () => {
				return res.end();
			});
		} catch (error: any) {
			return res.status(500).send({
				message: error.message,
			});
		}
	}
	public async fetchingFilesHandler(req: Request, res: Response) {
		// ... code to fetch file
		try {
			await mongoClient.connect();

			const database = mongoClient.db(process.env.DATABASE);
			const images = database.collection(
				config.get<string>('bucketName') + '.files'
			);

			const cursor = images.find({});

			if ((await cursor.count()) === 0) {
				return res.status(500).send({
					message: 'No files found!',
				});
			}

			let fileInfos: any = [];
			await cursor.forEach((doc) => {
				fileInfos.push({
					name: doc.filename,
					url: baseUrl + doc.filename,
				});
			});

			return res.status(200).send(fileInfos);
		} catch (error: any) {
			return res.status(500).send({
				message: error.message,
			});
		}
	}
}

export default UploadController;
