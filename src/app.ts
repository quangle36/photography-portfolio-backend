require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import connectDB from './utils/connectDB';
import {
	BlogRouter,
	AuthRouter,
	UserRouter,
	UploadRouter,
	MediaRouter,
	MusicRouter,
	GenreRouter,
	AlbumRouter,
} from './routes';
import mongoose from 'mongoose';
import { dbUrl } from './utils/constants';
import StatusCode from 'status-code-enum';
import { SuccessResponse } from './utils/response';
import { Album } from './models/album.model';
import bodyParser from 'body-parser';
const app = express();
const baseUrl = '/api';
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any());
// 1. Body Parser
app.use(express.json({ limit: '10kb' }));

// 2. Cookie Parser
app.use(cookieParser());

// 3. Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// 4. Cors
app.use(
	cors({
		origin: config.get<string>('origin'),
		credentials: true,
	})
);
// 5. Routes
app.use(`${baseUrl}/users`, UserRouter);
app.use(`${baseUrl}/auth`, AuthRouter);
app.use(`${baseUrl}/albums`, AlbumRouter);
app.use(`${baseUrl}/music`, MusicRouter);
app.use(`${baseUrl}/genre`, GenreRouter);
app.use(`${baseUrl}`, UploadRouter);
app.use(`${baseUrl}`, MediaRouter);
// Testing
app.get('/healthChecker', (req: Request, res: Response, next: NextFunction) => {
	res.status(200).json({
		status: 'success',
		message: 'Welcome to CodevoWeb????',
	});
});

// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
	const err = new Error(`Route ${req.originalUrl} not found`) as any;
	err.statusCode = 404;
	next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	err.status = err.status || 'error';
	err.statusCode = err.statusCode || 500;

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
});

const port = config.get<number>('port');
app.listen(port, () => {
	console.log(`Server started on port: ${port}`);
	// ? call the connectDB function here
	connectDB();
});
