import {
	DocumentType,
	Ref,
	getModelForClass,
	index,
	modelOptions,
	pre,
	prop,
} from '@typegoose/typegoose';
import { User } from './user.model';

class Comment {
	@prop({ ref: () => User })
	public commenter: Ref<User>;

	@prop({ required: true, type: () => String })
	public comment: string;

	@prop({ default: Date.now })
	public date?: Date;
}

export class Blog {
	@prop({ required: true })
	public title: string;

	@prop({ required: true })
	public content: string;

	@prop({ required: true })
	public author: string;

	@prop({ default: Date.now })
	public datePublished?: Date;

	@prop({ type: () => [String] })
	public tags?: string[];

	@prop({ ref: () => User })
	public likes?: Ref<User>[];

	@prop({
		type: () => [Comment],
	})
	public comments?: Comment[];
}

const BlogModel = getModelForClass(Blog);
export default BlogModel;
