import { Schema, model } from 'mongoose';

let user = new Schema(
	{
		role: {
			type: String,
			default: 'user',
			enum: ['user', 'admin'],
		},
		name: {
			type: String,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
		profile_avatar: {
			type: String,
			default: 'https://storage.googleapis.com/gps-project-bucket/avatars/profile00.png'
		},
		nDevices: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

export default model('User', user);
