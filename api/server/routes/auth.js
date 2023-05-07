import { Router } from 'express';
import authService from '../services/auth';

const authRouter = Router();

// Register an user
authRouter.post('/auth/signup', async (req, res) => {
	const payload = req.body;
	const { data, code } = await authService.register(payload);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

// Logs an user. Creates a JWT token if user exists. The payload of token contains all user info
authRouter.post('/auth/signin', async (req, res) => {
	const payload = req.body;
	const { data, code } = await authService.login(
		payload.email,
		payload.password
	);
	if (code === 200) res.cookie('token', data.token);

	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});

/** PATCH request to edit an user by email */
authRouter.patch('/auth/edit/:email', async (req, res) => {
	const { email } = req.params;
	const { newPass, oldPass } = req.body;
	const { data, code } = await authService.changePw(email, newPass, oldPass);
	return res.status(code).json({
		...data,
		status: true,
		apiVersion: 'v1',
		baseUrl: 'localhost:3000',
	});
});
export default authRouter;
