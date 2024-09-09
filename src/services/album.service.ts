import AlbumModel, { Album } from '../models/album.model';

//Create album service
export const createAlbum = async (input: Partial<Album>) => {
	const album = await AlbumModel.create(input);
	return album.toJSON();
};

export const findAllAlbums = async () => {
	return await AlbumModel.find({});
};

export const findAlbumById = async (id: string) => {
	return await AlbumModel.findById(id);
};

export const updateAlbumById = async (id: string, input: Partial<Album>) => {
	return await AlbumModel.findByIdAndUpdate(id, input, { new: true });
};

export const deleteAlbumById = async (id: string) => {
	return await AlbumModel.findByIdAndDelete(id);
};
