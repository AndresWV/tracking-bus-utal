import Gps from '../models/gps';
import User from '../models/user';
/** Create a new gps */
const createGps = async (payload) => {
	const {imei, phone} = payload;
	if(await Gps.exists({imei: imei}) && await Gps.exists({phone: phone}))
		return{code: 409, data: {message:'Error: imei or phone is registered'}};
	await User.findOneAndUpdate(
		{_id:payload.user},
		{$inc: {nDevices: 1}},
	);
		const create = await Gps.create(payload);
	return { code: 200, data: { messsage: '', gps: create } };
};

/** Get all gps, and vehicle associated, if is connected */
const getGps = async () => {
	const get = await Gps.find().populate('user vehicle');
	return { code: 200, data: { message: '', gps: get } };
};

/** Get gps of a specific user */
const getGpsUser = async (idFilter) => {
	const get = await Gps.find({ user: idFilter}).populate('vehicle');
	return { code: 200, data: { message: '', gps: get } };
};

/** Edit gps by id */
const editGps = async (idFilter, payload) => {
	const {imei, phone} = payload;
	if(await Gps.exists({imei: imei}) && await Gps.exists({phone: phone}))
		return{code: 409, data: {message:'Error: imei or phone is registered'}};
	await Gps.updateOne(
		{ vehicle: payload.vehicle },
		{ $set: {vehicle: null} }
	);
	const edit = await Gps.findOneAndUpdate(
		{ _id: idFilter },
		{ $set: payload }
	);
	return { code: 200, data: { message: '', gps: edit } };
};

/** Delete gps by id */
const deleteGps = async (idFilter) => {
	return await Gps.deleteOne({ _id: idFilter })
		.then((data) => {
			if (data) {
				console.log('Gps deleted sucessfuly ' + data.idFilter);
				return { code: 200, data: { message: 'Gps deleted' } };
			} else {
				console.log('Gps does not exist');
				return {
					code: 409,
					data: { message: 'Gps does not exist' },
				};
			}
		})
		.catch((err) => {
			//server error
			return { code: 500, data: { message: 'Internal Error' } };
		});
};

const gpsService = {
	createGps,
	getGps,
	editGps,
	deleteGps,
	getGpsUser,
};

export default Object.freeze(gpsService);
