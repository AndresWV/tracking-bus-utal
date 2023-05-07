import { Router } from 'express';
import expCoordService from '../services/expCoord';

const expCoordRouter = Router();

/** POST request to create a new exp coord */
expCoordRouter.post('/expCoord/create', async (req, res) => {
	const payload = req.body;
	const { data, code } = await expCoordService.createExpCoord(payload);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});
/** GET request to get last exp coord */
expCoordRouter.get('/expCoord/get', async (req, res) => {
	const { data, code } = await expCoordService.getExpCoord();
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** GET request to get last exp coord */
expCoordRouter.get('/expCoord/get/last', async (req, res) => {
	const { data, code } = await expCoordService.getLastExpCoord();
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** GET request to get last exp coord intersected with an area */
expCoordRouter.get('/expCoord/get/intersect', async (req, res) => {
	const { data, code } = await expCoordService.getInterCoord();
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

export default expCoordRouter;