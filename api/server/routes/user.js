import { Router } from 'express';
import userService from '../services/user';

const userRouter = Router();

/** POST request to create new user */
userRouter.post('/user/create', async (req, res) => {
	const payload = req.body;
	const { data, code } = await userService.createUser(payload);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** DELETE request to delete an user given his email */
userRouter.delete('/user/delete/:email', async (req, res) => {
	const payload = req.params['email'];
	const { data, code } = await userService.deleteUserByEmail(payload);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** GET request to get a specific user by email */
userRouter.get('/user/get/:id', async (req, res) => {
	const { id } = req.params;
	const { data, code } = await userService.getUserById(id);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** PATCH request to edit an user by email */
userRouter.patch('/user/edit/:idUser', async (req, res) => {
	const idFilter = req.params.idUser;
	const payload = req.body;
	const { data, code } = await userService.editUser(idFilter, payload);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** PATCH request to edit an user by email */
userRouter.patch('/user/edit/:email', async (req, res) => {
	const filter = req.params['email'];
	const payload = req.body;
	const { data, code } = await userService.editUserByEmail(filter, payload);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** GET request to get all users registered */
userRouter.get('/user/get', async (req, res) => {
	const { data, code } = await userService.getUser();
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});
export default userRouter;
