import mongoose from 'mongoose';
import multer from 'multer';
import Grid from 'gridfs-stream';
import { GridFsStorage } from 'multer-gridfs-storage';
import { dbUrl } from './constants';
import config from 'config';
import util from 'util';

const connectGFS = () => {
	// Create storage engine
	const storage = new GridFsStorage({
		url: dbUrl,
		options: { useNewUrlParser: true, useUnifiedTopology: true },
		file: (req, file) => {
			// const match = ['image/png', 'image/jpeg'];
			if (file.mimetype === 'audio/mpeg') {
				return {
					bucketName: config.get<string>('bucketMusicsName'),
					filename: `${Date.now()}-${file.originalname}`,
				};
			} else if (
				file.mimetype === 'image/png' ||
				file.mimetype === 'image/jpeg'
			) {
				return {
					bucketName: config.get<string>('bucketPhotosName'),
					filename: `${Date.now()}-bezkoder-${file.originalname}`,
				};
			} else {
				const filename = `${Date.now()}-${file.originalname}`;
				return filename;
			}
		},
	});

	let uploadFiles = multer({ storage: storage }).array('file', 10);
	let uploadFilesMiddleware = util.promisify(uploadFiles);

	return { uploadFilesMiddleware };
};

export default connectGFS;
