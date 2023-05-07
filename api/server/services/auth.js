import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const getUser = (user) => {
	return {
		name: user.name,
		_id: user._id,
		email: user.email,
		role: user.role,
		profile_avatar: user.profile_avatar,
	};
};

/** Create new user */
const register = async (payload) => {
	if (await User.exists({ email: payload.email }))
		return { code: 409, data: { message: 'Email is used' } };

	const salt = bcrypt.genSaltSync(10);
	const password = bcrypt.hashSync(payload.password, salt);

	const create = await User.create({
		...payload,
		email: payload.email.toLowerCase(),
		password,
	});
	return { code: 200, data: { message: '', user: getUser(create) } };
};
//Logs a new user
const login = async (email, password) => {
	const user = await User.findOne({ email: email });
	if (!user || !bcrypt.compareSync(password, user.password))
		return {
			code: 409,
			data: { message: 'Problem with password or User' },
		};
	// The payload of token contains all user info
	return {
		code: 200,
		data: {
			message: 'User logged',
			user: getUser(user),
			token: jwt.sign(
				{
					_id: user._id,
					name: user.name,
					email: user.email,
					role: user.role,
				},
				process.env.JWT_SECRET
			),
		},
	};
};

const changePw = async (email, newPass, oldPass) => {
	const user = await User.findOne({ email: email });
	if (!user || !bcrypt.compareSync(oldPass, user.password))
		return {
			code: 401,
			data: { message: 'Usuario o contraseña no validos' },
		};
	const salt = bcrypt.genSaltSync(10);
	const pw = bcrypt.hashSync(newPass, salt);
	const edit = await User.findOneAndUpdate(
		{ email: email },
		{ password: pw }
	);

	return { code: 200, data: { message: '', user: edit } };
};
const authService = {
	register,
	login,
	changePw,
};

export default Object.freeze(authService);
