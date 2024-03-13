import GenreModel, { Genre } from '../models/genre.model';

//Create genre service
export const createGenre = async (input: Partial<Genre>) => {
	const genre = await GenreModel.create(input);
	return genre.toJSON();
};

export const findAllGenres = async () => {
	return await GenreModel.find();
};

export const findGenreById = async (id: string) => {
	return await GenreModel.findById(id);
};

export const findGenreByName = async (genreName: string) => {
	const regex = new RegExp(genreName, 'i');
	const genre = await GenreModel.findOne({ name: { $regex: regex } });
	return genre;
};

export const updateGenreById = async (id: string, input: Partial<Genre>) => {
	return await GenreModel.findByIdAndUpdate(id, input, { new: true });
};

export const deleteGenreById = async (id: string) => {
	return await GenreModel.findByIdAndDelete(id);
};
