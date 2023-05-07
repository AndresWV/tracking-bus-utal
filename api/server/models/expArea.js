import { Schema, model } from 'mongoose';

let expArea = new Schema(
	{
        type: {
            type: String,
            enum: ['Polygon'],
            required: true
          },
          coordinates: {
            type: [[[Number]]],
            required: true
          }
	},
	{ timestamps: true }
);

export default model('ExpArea', expArea);