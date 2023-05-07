import config from './config/config';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import auth from './middleware/jwt';
import cors from 'cors';
import apiErrorHandler from './middleware/apiErrorHandler';
//import {middleware} from './middleware/auth';

const app = express();

/**Db connection */
mongoose
  .connect(config.URL_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log('Connected to database'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(auth);

app.set('port', config.PORT || 3000);
routes(app);
app.use(apiErrorHandler);

app.listen(config.PORT, function () {
  console.log(
    `App listening on http://localhost:${config.PORT}`
  );
});
