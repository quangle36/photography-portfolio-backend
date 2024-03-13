import {
	DocumentType,
	getModelForClass,
	index,
	modelOptions,
	pre,
	prop,
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

@modelOptions({
	schemaOptions: {
		// Add createdAt and updatedAt fields
		timestamps: true,
	},
})
@index({ name: 1 })
export class Genre {
	@prop({ required: true, unique: true })
	name: string;

	@prop({ required: true })
	image: string;
}

const GenreModel = getModelForClass(Genre);
export default GenreModel;
