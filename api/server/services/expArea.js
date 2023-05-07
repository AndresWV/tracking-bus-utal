import ExpArea from '../models/expArea';



/** Create new area exp */
const createExpArea = async (payload) => {
	const create = await ExpArea.create(payload);
	return { code: 200, data: { message: '', expArea: create } };
};

/** Get last area exp*/
const getExpArea = async () => {
	const get = await ExpArea.findOne();
    console.log(typeof(get.coordinates[0][0][0]));
	return { code: 200, data: { message: '', expArea: get } };
};

const expAreaService = {
	createExpArea,
	getExpArea,
};

export default Object.freeze(expAreaService);