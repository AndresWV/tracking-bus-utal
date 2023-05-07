import { Router } from 'express';
import coordService from '../services/coord';

const coordRouter = Router();

/** POST request to create a new coord */
/**
 * payload: {
 * 	lat: numero
 * 	lng: numero
 * 	alarm: String
 * }
 */
coordRouter.post('/coord/create/:imei', async (req, res) => {
	const imeiFilter = req.params.imei;
	const payload = req.body;
	const { data, code } = await coordService.createCoord(imeiFilter, payload);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** GET request to get last route of gps by imei */
coordRouter.get('/coord/get/route/:imei', async (req, res) => {
	const imeiFilter = req.params.imei;
	const { data, code } = await coordService.getlastRoute(imeiFilter);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** GET request to get last coord of a specific gps imei */
coordRouter.get('/coord/get/last/:imei', async (req, res) => {
	const imeiFilter = req.params.imei;
	const { data, code } = await coordService.getLastCoord(imeiFilter);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** DELETE request to delete a coord by id */
coordRouter.delete('/coord/delete/:idcoord/:imei', async (req, res) => {
	const idFilter = req.params.idcoord;
	const imeiFilter = req.params.imei;
	const { data, code } = await coordService.deleteCoord(idFilter, imeiFilter);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

export default coordRouter;
