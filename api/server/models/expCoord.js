import { Schema, model } from 'mongoose';

let expCoord = new Schema(
	{
        type: {
            type: String,
            enum: ['Point'],
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
	},
	{ timestamps: true }
);

export default model('ExpCoord', expCoord);