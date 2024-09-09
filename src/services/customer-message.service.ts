import CustomerMessageModel, {
	CustomerMessage,
} from '../models/customer-message.model';

export const createCustomerMessage = async (
	input: Partial<CustomerMessage>
) => {
	const customerMessage = await CustomerMessageModel.create(input);
	return customerMessage.toJSON();
};
