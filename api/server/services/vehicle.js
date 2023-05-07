import Vehicle from '../models/vehicle';
import User from '../models/user';

/** Create new vehicle */
const createVehicle = async (payload) => {
	const {patent} = payload;
	if(await Vehicle.exists({patent: patent}))
		return{code: 409, data: {message:'Error: patent is registered'}};	
	const create = await Vehicle.create(payload);
	await User.findOneAndUpdate(
		{_id: payload.user},
		{$inc: {nDevices:1}},
	);
	return { code: 200, data: { messsage: '', vehicle: create } };
};

/** Get all vehicles, with their respective user and gps */
const getVehicle = async () => {
	const get = await Vehicle.find().populate('user gps');
	return { code: 200, data: { message: '', vehicle: get } };
};

/** Get all vehicles of a specific user */
const getUserVehicles = async (idFilter) => {
	const get = await Vehicle.find({ user: idFilter }).populate('gps');
	return { code: 200, data: { message: '', vehicle: get } };
};

/** Edit a vehicle by id */
const editVehicle = async (idFilter, payload) => {
	const {patent} = payload;
	if(await Vehicle.exists({patent: patent}))
		return{code: 409, data: {message:'Error: patent is registered'}};
	const edit = await Vehicle.findOneAndUpdate(
		{ _id: idFilter },
		{ $set: payload }
	);
	return { code: 200, data: { message: '', vehicle: edit } };
};

/** Delete a vehicle by id */
const deleteVehicle = async (idFilter) => {
	return await Vehicle.deleteOne({ _id: idFilter })
		.then((data) => {
			if (data) {
				console.log('Vehicle deleted sucessfuly ' + data.idFilter);
				return { code: 200, data: { message: 'Vehicle deleted' } };
			} else {
				console.log('Vehicle does not exist');
				return {
					code: 409,
					data: { message: 'Vehicle does not exist' },
				};
			}
		})
		.catch((err) => {
			//server error
			return { code: 500, data: { message: 'Internal Error' } };
		});
};

const vehicleService = {
	createVehicle,
	getVehicle,
	editVehicle,
	deleteVehicle,
	getUserVehicles,
};

export default Object.freeze(vehicleService);
