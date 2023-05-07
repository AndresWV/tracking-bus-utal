import { Router } from 'express';
import vehicleService from '../services/vehicle';

const vehicleRouter = Router();

/** POST request to create a new vehicle */
vehicleRouter.post('/vehicle/create', async (req, res) => {
	const payload = req.body;
	const { data, code } = await vehicleService.createVehicle(payload);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** GET request to get all vehicles */
vehicleRouter.get('/vehicle/get', async (req, res) => {
	const { data, code } = await vehicleService.getVehicle();
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** GET request to get all vehicles of a specific user */
vehicleRouter.get('/vehicle/get/:iduser', async (req, res) => {
	const idFilter = req.params.iduser;
	const { data, code } = await vehicleService.getUserVehicles(idFilter);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** PATCH request to edit a vehicle by id */
vehicleRouter.patch('/vehicle/edit/:idvehicle', async (req, res) => {
	const idFilter = req.params.idvehicle;
	const payload = req.body;
	const { data, code } = await vehicleService.editVehicle(
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

/** DELETE request to delete a vehicle by id */
vehicleRouter.delete('/vehicle/delete/:idvehicle', async (req, res) => {
	const idFilter = req.params.idvehicle;
	const { data, code } = await vehicleService.deleteVehicle(idFilter);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

export default vehicleRouter;
