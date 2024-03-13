import * as lodash from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import userModel, { User } from '../models/user.model';
import { excludedFields } from '../controllers/auth.controller';
import { signJwt } from '../utils/jwt';
// import redisClient from '../utils/connectRedis';
import { DocumentType } from '@typegoose/typegoose';
import config from '../../config/default';
import redisClient from '../utils/connectRedis';
// CreateUser service
export const createUser = async (input: Partial<User>) => {
	const user = await userModel.create(input);
	return lodash.omit(user.toJSON(), excludedFields);
};

// Find User by Id
export const findUserById = async (id: string) => {
	const user = await userModel.findById(id).lean();
	return lodash.omit(user, excludedFields);
};

// Find All users
export const findAllUsers = async () => {
	return await userModel.find();
};

// Find one user by any fields
export const findUser = async (
	query: FilterQuery<User>,
	options: QueryOptions = {}
) => {
	return await userModel.findOne(query, {}, options).select('+password');
};

// Sign Token
export const signToken = async (user: DocumentType<User>) => {
	// Sign the access token
	const access_token = signJwt({ sub: user._id }, 'accessTokenPrivateKey', {
		expiresIn: `${config.accessTokenExpiresIn}m`,
	});

	// Sign the refresh token
	const refresh_token = signJwt({ sub: user._id }, 'refreshTokenPrivateKey', {
		expiresIn: `${config.refreshTokenExpiresIn}h`,
	});

	// Create a Session
	redisClient.set(`${user._id}`, JSON.stringify(user), { EX: 60 * 60 });

	// Return access token
	return { access_token, refresh_token };
};
