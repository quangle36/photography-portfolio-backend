export const SuccessResponse = (data: any) => {
	return {
		message: 'Success',
		data,
	};
};

export const FailedResponse = (message: string) => {
	return {
		message,
	};
};
