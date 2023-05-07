import Gps from '../models/gps';
import dayjs from 'dayjs';
//dayjs.tz.setDefault('America/Santiago');

const logs = async (userId) => {
	const gps = await Gps.find({ user: userId });
	const logs = gps.flatMap((gps) => {
		return gps.coords.flatMap((coord) => {
			return {
				name: gps.name,
				imei: coord.imei,
				lat: coord.lat,
				lng: coord.lng,
				createdAt: dayjs(coord.createdAt).format('YYYY/MM/DD HH:mm'),
				alarm: coord.alarm,
			};
		});
	});
	return {
		code: 200,
		data: {
			message: 'Logs devuelto',
			logs: logs,
		},
	};
};

const logService = {
	logs,
};

export default Object.freeze(logService);
