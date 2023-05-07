import { Router } from 'express';
import apiError from '../middleware/apiError';
import gpsService from '../services/gps';

const gpsRouter = Router();

/** POST request to create a new gps */
gpsRouter.post('/gps/create', async (req, res, next) => {
	const payload = req.body;
	const { data, code } = await gpsService.createGps(payload);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** GET request to get all gps */
gpsRouter.get('/gps/get', async (req, res) => {
	const { data, code } = await gpsService.getGps();
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});


/** GET request to get gps of an user */
gpsRouter.get('/gps/get/:iduser', async (req, res) => {
	const idFilter = req.params.iduser;
	const { data, code } = await gpsService.getGpsUser(idFilter);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** PATCH request to edit gps by id */
gpsRouter.patch('/gps/edit/:idgps', async (req, res) => {
	const idFilter = req.params.idgps;
	const payload = req.body;
	const { data, code } = await gpsService.editGps(
		idFilter,
		payload
	);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** DELETE request to delete gps by id */
gpsRouter.delete('/gps/delete/:idgps', async (req, res) => {
	const idFilter = req.params.idgps;
	const { data, code } = await gpsService.deleteGps(idFilter);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

export default gpsRouter;
