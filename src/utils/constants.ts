// export const dbUrl = `mongodb+srv://${config.get('dbName')}:${config.get(
// 	'dbPass'
// )}@cluster0.jd9vy1b.mongodb.net/${config.get(
// 	'database'
// )}?retryWrites=true&w=majority`;

export const dbUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.jd9vy1b.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
