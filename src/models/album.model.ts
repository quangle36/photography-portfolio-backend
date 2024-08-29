import {
	DocumentType,
	Ref,
	getModelForClass,
	index,
	modelOptions,
	pre,
	prop,
} from '@typegoose/typegoose';

@modelOptions({
	schemaOptions: {
		// Add createdAt and updatedAt fields
		timestamps: true,
	},
})
@index({ name: 1 })
export class Album {
	@prop({ required: true })
	public name: string;

	@prop({ required: true })
	public coverImageSrc: string;

	@prop({ required: true })
	public date: string;

	@prop({ required: true })
	public location: string;

	@prop({ required: true })
	public folderName: string;

	@prop({ required: true })
	public images: string[];

	// @prop({ default: Date.now })
	// public datePublished?: Date;

	// @prop({ type: () => [String] })
	// public tags?: string[];

	// @prop({ ref: () => User })
	// public likes?: Ref<User>[];

	// @prop({
	// 	type: () => [Comment],
	// })
	// public comments?: Comment[];
}

const AlbumModel = getModelForClass(Album);
export default AlbumModel;
