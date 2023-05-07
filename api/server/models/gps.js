import { Schema, model } from 'mongoose';

let coord = new Schema(
	{
		lat: {
			type: Number,
		},
		lng: {
			type: Number,
		},
		imei: {
			type: String,
		},
		alarm: {
			type: String,
			required: false,
			default: 'Sin mensaje',
		},
	},
	{ timestamps: true }
);

let gps = new Schema(
	{
		name: {
			type: String,
		},
		phone: {
			type: String,
		},
		imei: {
			type: String,
		},
		type: {
			type: String,
			//enum: ['FMB', 'TK','3'],
		},
		vehicle: {
			type: Schema.Types.ObjectId,
			ref: 'Vehicle',
			default: null,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		countercoord: {
			type: Number,
			default: 0,
		},
		coords: [coord],
	},
	{ timestamps: true }
);

export default model('Gps', gps);
