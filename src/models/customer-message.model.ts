import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({
	schemaOptions: {
		// Add createdAt and updatedAt fields
		timestamps: true,
	},
})
export class CustomerMessage {
	@prop({ required: true })
	public name!: string;

	@prop({ required: true })
	public email!: string;

	@prop({ required: true })
	public message!: string;

	@prop({ immutable: true })
	public createdAt: Date;

	@prop()
	public updatedAt?: Date;
}

const CustomerMessageModel = getModelForClass(CustomerMessage);

export default CustomerMessageModel;
