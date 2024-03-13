import GenreModel from '../models/genre.model';
import MusicModel, { Music } from '../models/music.model';
import { findGenreByName } from './genre.service';

//Create Music service
export const createMusic = async (input: Partial<Music>) => {
	const Music = await MusicModel.create(input);
	return Music.toJSON();
};

export const findAllMusics = async (query: Object) => {
	return await MusicModel.find(query).populate('genre');
};

export const findMusicById = async (id: string) => {
	return await MusicModel.findById(id);
};

export const updateMusicById = async (id: string, input: Partial<Music>) => {
	return await MusicModel.findByIdAndUpdate(id, input, { new: true });
};

export const deleteMusicById = async (id: string) => {
	return await MusicModel.findByIdAndDelete(id);
};

// export const findMusicsByGenre = async (genreName: string) => {
// 	const genre = await findGenreByName(genreName);
// 	const musics = await MusicModel.find({ genre: genre?._id }).populate('genre');
// 	return musics;
// };
