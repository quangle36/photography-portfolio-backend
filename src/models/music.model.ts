import { prop, getModelForClass, index, Ref } from '@typegoose/typegoose';
import { Genre } from './genre.model';

@index({ artists: 1, title: 1 }, { unique: true })
export class Music {
	@prop({ required: true })
	artists: string;

	@prop({ required: true, ref: () => Genre })
	genre: Ref<Genre>;

	@prop({})
	image: string;

	@prop({ default: 0 })
	likes: number;

	@prop({ required: true })
	slug: string;

	@prop({ required: true })
	src: string;

	@prop({ required: true })
	title: string;
}

const MusicModel = getModelForClass(Music);

export default MusicModel;
