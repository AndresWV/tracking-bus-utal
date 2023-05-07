import { Schema, model } from 'mongoose';

let vehicle = new Schema({
	name: {
		type: String,
	},
	brand: {
		type: String,
	},
	model: {
		type: String,
	},
	patent: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	gps: {
		type: Schema.Types.ObjectId,
		ref: 'Gps',
		default: null,
	},
});

export default model('Vehicle', vehicle);
