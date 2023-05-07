'use strict';

import userRouter from './user';
import vehicleRouter from './vehicle';
import gpsRouter from './gps';
import coordRouter from './coord';
import authRouter from './auth';
import dashboardRoute from './dashboard';
import logsRouter from './logs';
import expCoordRouter from './expCoord';
import expAreaRouter from './expArea';


const apiVersion = '/api/v1';

export default (app) => {
	app.use(apiVersion, userRouter);
	app.use(apiVersion, vehicleRouter);
	app.use(apiVersion, gpsRouter);
	app.use(apiVersion, coordRouter);
	app.use(apiVersion, expCoordRouter);
	app.use(apiVersion, expAreaRouter);
	app.use(apiVersion, authRouter);
	app.use(apiVersion, dashboardRoute);
	app.use(apiVersion, logsRouter);
};
