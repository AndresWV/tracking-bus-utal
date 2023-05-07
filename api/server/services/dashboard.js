import dayjs from 'dayjs';
import Gps from '../models/gps';
import User from '../models/user';
import Vehicle from '../models/vehicle';

const getInformation = async () => {
	const cantUsers = await countUsers();
	const cantVehicles = await countVehicles();
	const cantGPS = await countGPS();
	const cantTK103 = await countType('TK 103');
	const cantSTK303 = await countType('STK303');
	const cantVhWithGps = await countVhWithGPS();
	const cantVhWithGpsTK = await countVhWithGPSTYpe('TK 103');
	const cantVhWithGpsSTK = await countVhWithGPSTYpe('STK303');

	return {
		code: 200,
		data: {
			message: 'Get information',
			info: {
				cantUsers,
				cantVehicles,
				cantGPS,
				cantTK103,
				cantSTK303,
				cantVhWithGps,
				cantVhWithGpsTK,
				cantVhWithGpsSTK,
			},
		},
	};
};

const getInfoHistCars = async () => {
	const gps = await Gps.find();
	const coords = gps
		.flatMap((gps) => {
			return gps.coords.flatMap((coord) => {
				return {
					type: gps.type,
					imei: gps.imei,
					createdAt: dayjs(coord.createdAt).format('YYYY/MM/DD'),
				};
			});
		})
		.filter((coord) =>
			dayjs()
				.subtract(6, 'days')
				.isBefore(dayjs(coord.createdAt, 'YYYY/MM/DD'))
		)
		.sort();
	let history = {};
	[5, 4, 3, 2, 1, 0].forEach((day) => {
		const date = dayjs().subtract(day, 'days').format('YYYY/MM/DD');
		history[date] = { date: date, coords: [] };
	});

	coords.forEach((coord) => {
		if (
			history.hasOwnProperty(coord.createdAt) &&
			!history[coord.createdAt].coords.includes(coord.imei)
		)
			history[coord.createdAt].coords.push(coord.imei);
	});

	return {
		code: 200,
		data: {
			message: 'Get History',
			history: history,
		},
	};
};

const getInfoUser = async (idUser) => {
	let nVh = (await Vehicle.find({ user: idUser })).length;
	let nGps = (await Gps.find({ user: idUser })).length;
	return {
		code: 200,
		data: {
			message: 'Get information',
			info: {
				nVh,
				nGps,
			},
		},
	};
};

const countUsers = async () => {
	const users = await User.find({ role: 'user' });
	const count = users.length;
	return count;
};

const countVehicles = async () => {
	const vh = await Vehicle.find();
	const count = vh.length;
	return count;
};

const countGPS = async () => {
	const gps = await Gps.find();
	const count = gps.length;
	return count;
};

const countType = async (gpsType) => {
	const gps = await Gps.find();
	const type = gps.filter((e) => e.type == gpsType);
	return type.length;
};

const countVhWithGPS = async () => {
	const vh = await Vehicle.find();
	const cant = vh.filter((e) => e.gps !== null);
	return cant.length;
};

const countVhWithGPSTYpe = async (gpsType) => {
	let vh = await Vehicle.find().populate('gps');
	vh = vh.filter((e) => e.gps !== null);
	const type = vh.filter((e) => e.gps.type == gpsType);
	return type.length;
};

const getActiveUser = async () => {
	const get = await User.find({ nDevices: { $gt: 0 } });
	return { code: 200, data: { message: '', user: get } };
};

const dashboardService = {
	getInformation,
	getInfoUser,
	getInfoHistCars,
	getActiveUser,
};

export default Object.freeze(dashboardService);
