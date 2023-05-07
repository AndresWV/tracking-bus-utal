import Gps from '../models/gps';
import dayjs from 'dayjs';
/** Create new coord from a specific gps */
const createCoord = async (imeiFilter, payload) => {
	const create = await Gps.findOneAndUpdate(
		{ imei: imeiFilter },
		{ $push:{coords: payload} , $inc:{countercoord: 1} },{new: true},
	);
	return { code: 200, data: { messsage: '', gps : create } };
};

/** Get last Route in 10 minutes */
const getLastRoute = async (imeiFilter) => {
	const date1=dayjs((await getCoordsGps(imeiFilter)).data.gps.createdAt);
	const date2 = date1.subtract(10,'minute');
	const get = await Gps.findOne({imei:imeiFilter});
	const coords = get.coords;
	const route= coords.filter(element => {
		return date2.isBefore(element.createdAt);
	});
	return { code: 200, data: { message: '', route } };
};

/** Get last coord of a specific gps by imei*/
const getLastCoord = async (imei) => {
	return await Gps.findOne({imei: imei, countercoord: {$gt: 0}})
	//return { code: 200, data: { message: '', gps: get.coords.pop() } };
	.then((data) => {
		if(data){
			console.log('Last coord founded succesfully');
			return { code: 200, data: { message: 'Last coord founded succesfully', gps: data.coords.pop() } };
		} else {
			console.log('Gps does not have any coord registered');
			return {
				code: 200,
				data: { message: 'Gps does not have any coord registered' },
			};
		}
	})
	.catch((err) => {
		//server error
		return { code: 500, data: { message: 'Internal Error' } };
	});
};


/** Delete coord by id and imei*/
const deleteCoord = async (idFilter,imeiFilter) => {
	return await Gps.findOneAndUpdate({ imei: imeiFilter, 'coords._id': idFilter },
		{$pull: {coords: {_id: idFilter}}})
		.then((data) => {
			if (data) {
				console.log('Coord deleted sucessfuly ' + data.idFilter);
				return { code: 200, data: { message: 'Coord deleted' } };
			} else {
				console.log('Coord does not exist');
				return {
					code: 409,
					data: { message: 'Coord does not exist' },
				};
			}
		})
		.catch((err) => {
			//server error
			return { code: 500, data: { message: 'Internal Error' } };
		});
};

const coordService = {
	createCoord,
	getLastRoute,
	getLastCoord,
	deleteCoord,
};

export default Object.freeze(coordService);
