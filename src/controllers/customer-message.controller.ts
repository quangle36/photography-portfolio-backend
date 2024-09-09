import StatusCode from 'status-code-enum';
import express, { Request, Response } from 'express';
import CustomerMessageModel from '../models/customer-message.model';
import { createCustomerMessage } from '../services/customer-message.service';
import { SuccessResponse } from '../utils/response';

async function canSendMessage(email: string): Promise<boolean> {
	const cooldownMinutes = 5;
	const lastMessage = await CustomerMessageModel.findOne({ email }).sort({
		createdAt: -1,
	});

	if (lastMessage) {
		const currentTime = new Date().getTime();
		const lastSentTime = new Date(lastMessage.createdAt).getTime();
		const timeDiff = (currentTime - lastSentTime) / (1000 * 60); // convert milliseconds to minutes

		if (timeDiff < cooldownMinutes) {
			return false; // Prevent message sending
		}
	}

	return true; // Allow message sending
}

class CustomerMessageController {
	public createCustomerMessageHandler = async (req: Request, res: Response) => {
		try {
			if (await canSendMessage(req.body.email)) {
				const customerMessage = await createCustomerMessage({
					email: req.body.email,
					message: req.body.message,
					name: req.body.name,
				});
				res
					.status(StatusCode.SuccessCreated)
					.json(SuccessResponse(customerMessage));
			} else {
				res
					.status(StatusCode.ClientErrorBadRequest)
					.json({ error: 'You can send only one message every 5 minutes' });
			}
		} catch (err: any) {
			res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
		}
	};
}

export default CustomerMessageController;
