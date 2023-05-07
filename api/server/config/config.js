/* eslint-disable no-undef */
const dotenv = require('dotenv').config();

module.exports = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT || 3000,
	URL_DB:
		process.env.URL_DB ||
		'mongodb+srv://leunam:dockercompose.yml@cluster0.xkzma.mongodb.net/gps-app?retryWrites=true&w=majority',
};
