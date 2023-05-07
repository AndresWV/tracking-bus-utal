import { Router } from 'express';
import expAreaService from '../services/expArea';

const expAreaRouter = Router();

/** POST request to create a new exp area */
expAreaRouter.post('/expArea/create', async (req, res) => {
	const payload = req.body;
	const { data, code } = await expAreaService.createExpArea(payload);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** GET request to get last exp area */
expAreaRouter.get('/expArea/get', async (req, res) => {
	const { data, code } = await expAreaService.getExpArea();
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});


export default expAreaRouter;