import express, { Request, Response } from 'express';
import StatusCode from 'status-code-enum';
import { GridFSBucket } from 'mongodb';
import { SuccessResponse } from '../utils/response';
import connectGFS from '../utils/connectGFS';
import { MongoClient } from 'mongodb';
import { dbUrl } from '../utils/constants';
import config, { get } from 'config';
import { getFileExtension } from '../utils/common';
const mongoClient = new MongoClient(dbUrl);
const baseUrl = 'http://localhost:8000/api/files/';
class MediaController {
	public async downloadFileHandler(req: Request, res: Response) {
		// ... code to delete file
		const getBucketName = (): string => {
			const fileExtension = getFileExtension(req.params.name);
			if (fileExtension === 'mp3') {
				return config.get('bucketMusicsName');
			}
			return fileExtension === 'jpg' || fileExtension === 'png'
				? config.get('bucketPhotosName')
				: 'null';
		};
		try {
			await mongoClient.connect();
			const database = mongoClient.db(process.env.DATABASE);

			const bucket = new GridFSBucket(database, {
				bucketName: getBucketName(),
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
			const collection = () => {
				if (req.query.fileType === 'images') {
					return config.get('bucketPhotosName');
				}
				return req.query.fileType === 'musics'
					? config.get('bucketMusicsName')
					: 'null';
			};
			console.log(`${collection()}.files`);
			const files = database.collection(`${collection()}.files`);

			const cursor = files.find({});

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

export default MediaController;
