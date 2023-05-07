import { Router } from 'express';
import dashboardService from '../services/dashboard';

const dashboardRoute = Router();

dashboardRoute.get('/get/dashboard', async (req, res) => {
	const { data, code } = await dashboardService.getInformation();
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

dashboardRoute.get('/get/users/active', async (req, res) => {
	const { data, code } = await dashboardService.getActiveUser();
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

dashboardRoute.get('/get/dashboard/:idUser', async (req, res) => {
	const { idUser } = req.params;
	const { data, code } = await dashboardService.getInfoUser(idUser);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

dashboardRoute.get('/get/dashboard-history', async (req, res) => {
	const { data, code } = await dashboardService.getInfoHistCars();
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

export default dashboardRoute;
