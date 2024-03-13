import mongoose from 'mongoose';
import { dbUrl } from './constants';

// const dbUrl = `mongodb://${config.get('dbName')}:${config.get(
// 	'dbPass'
// )}@localhost:27017/jwtAuth?authSource=admin`;
// const dbUrl = `mongodb+srv://${config.get('dbName')}:${config.get(
// 	'dbPass'
// )}@cluster0.jd9vy1b.mongodb.net/?retryWrites=true&w=majority`;
const connectDB = async () => {
	try {
		await mongoose.connect(dbUrl);
		console.log('Database connected...');
	} catch (error: any) {
		console.log(error.message);
		setTimeout(connectDB, 5000);
	}
};

export default connectDB;
