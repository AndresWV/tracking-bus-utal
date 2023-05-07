import ExpCoord from '../models/expCoord';
import expArea from './expArea';



/** Create new coord exp */
const createExpCoord = async (payload) => {
	const create = await ExpCoord.create(payload);
	return { code: 200, data: { message: '', expCoord: create } };
};

/** Get all coords exp*/
const getExpCoord = async () => {
	const get = await ExpCoord.find().sort({createdAt:-1});
	return { code: 200, data: { message: '', expCoord: get } };
};

/** Get last coords exp*/
const getLastExpCoord = async () => {
	const get = await ExpCoord.findOne().sort({createdAt:-1});
    console.log(typeof(get.coordinates[0]));
	return { code: 200, data: { message: '', expCoord: get } };
};

const getInterCoord = async () => {
	const area = await expArea.getExpArea().get;
	const get = await ExpCoord.find(
		{
		coordinates:{ $geoWithin:{
			$geometry: {
				type: "Polygon",
				coordinates: 
				[[[-101,31],[-99,31],[-99,29],[-101,29],[-101,31]]]
			}
		}
		}
	}
	).sort({createdAt:-1});
	return { code: 200, data: { message: '', expCoord: get } };
};

const expCoordService = {
	createExpCoord,
	getExpCoord,
	getLastExpCoord,
	getInterCoord,
};

export default Object.freeze(expCoordService);