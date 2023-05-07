import { Router } from 'express';
import logServices from '../services/logs';

const logsRouter = Router();

logsRouter.get('/get/logs/:userId', async (req, res) => {
	console.log('data');
	const { userId } = req.params;
	const { data, code } = await logServices.logs(userId);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

export default logsRouter;
