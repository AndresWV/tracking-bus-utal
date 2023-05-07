import Gps from '../models/gps';
import User from '../models/user';
import Vehicle from '../models/vehicle';

/** Delete user by email */
const deleteUserByEmail = async (payload) => {
	return await User.findOneAndDelete({ email: payload })
		.then(async (data) => {
			// If user has been founded
			if (data) {
				console.log('User deleted successfuly: ' + data.email);
				await deleteUserVehicles(data._id);
				await deleteUserGps(data._id);
				return {
					code: 200,
					data: { message: 'User deleted', user: data },
				};
			} else {
				// If user has not been founded
				console.log('User does not exist');
				return { code: 409, data: { message: 'User does not exist' } };
			}
		})
		.catch((err) => {
			// A server error
			return { code: 500, data: { message: 'Internal Error' } };
		});
};

const deleteUserVehicles = async (idFilter) => {
	console.log('entra ' + idFilter);
	await Vehicle.findOneAndDelete({ user: idFilter })
		.then((data) => {
			// If vehicle has been founded
			if (data) {
				console.log('User vehicle deleted successfuly: ' + data.name);
				deleteUserVehicles(idFilter);
			} else {
				// If user has not been founded
				console.log(
					'User vehicle does not have any vehicle registered'
				);
			}
		})
		.catch((err) => {
			// A server error
			return { code: 500, data: { message: 'Internal Error' } };
		});
};
const deleteUserGps = async (idFilter) => {
	console.log('entra ' + idFilter);
	await Gps.findOneAndDelete({ user: idFilter })
		.then((data) => {
			// If vehicle has been founded
			if (data) {
				console.log('User gps deleted successfuly: ' + data.name);
				deleteUserGps(idFilter);
			} else {
				// If user has not been founded
				console.log('User gps does not have any gps registered');
			}
		})
		.catch((err) => {
			// A server error
			return { code: 500, data: { message: 'Internal Error' } };
		});
};
/** Get user by email */
const getUserById = async (id) => {
	const user = await User.findOne({ _id: id });

	if (!user) return { code: 409, data: { message: 'User does not exist' } };
	return {
		code: 200,
		data: { message: 'User found', user },
	};
};

/** Edit user by email */
const editUserByEmail = async (filter, payload) => {
	return await User.findOneAndUpdate({ email: filter }, { $set: payload })
		.then((data) => {
			// If user has been founded
			if (data) {
				console.log('User updated successfuly: ' + data.email);
				return {
					code: 200,
					data: { message: 'User updated', user: data },
				};
			} else {
				// If user has not been founded
				console.log('User does not exist');
				return { code: 409, data: { message: 'User does not exist' } };
			}
		})
		.catch((err) => {
			// A server error
			return { code: 500, data: { message: 'Internal Error' } };
		});
};

const editUser = async (idFilter, payload) => {
	const { email } = payload;
	const user = await User.findOne({ email: email });
	if (!!user && idFilter.toString() !== user._id.toString())
		return {
			code: 409,
			data: { message: 'Error: email is already registered' },
		};
	const edit = await User.findOneAndUpdate(
		{ _id: idFilter },
		{ $set: payload }
	);
	return { code: 200, data: { message: '', user: edit } };
};
/** Get all users */
const getUser = async () => {
	let get = await User.find();
	get = get.filter((u) => u.role !== 'admin');
	return { code: 200, data: { message: '', user: get } };
};
const userService = {
	deleteUserByEmail,
	getUserById,
	getUser,
	editUserByEmail,
	editUser,
};

export default Object.freeze(userService);
