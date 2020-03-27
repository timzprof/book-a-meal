import '@babel/polyfill';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import favicon from 'express-favicon';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import { logger } from './util/logger';
import Routes from './routes';
import db from './util/db';
import swaggerDocument from './swagger.json';

const { CronJob } = require('cron');

config();

const app = express();

const PORT = process.env.PORT || 7000;

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(favicon(path.resolve('client/build/favicon.ico')));
app.use(express.static(path.resolve('client')));
app.use(express.static(path.resolve('client/build')));
app.use(express.static(path.resolve('api/images')));

// const wipeDbTrash = async () => {
//   try {
//     await Menu.truncate();
//     await OrderItem.truncate();
//     await Meal.update({ quantity: null });
//     logger.log('info:', 'Wiped DB Trash');
//   } catch (err) {
//     logger.error('error', 'DB JOB:', err);
//   }
// };

const ORIGIN = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '*';

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Origin', ORIGIN);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Req'
  );
  res.header(
    'Access-Control-Request-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Req'
  );
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', Routes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('client/build', 'index.html'));
});

// Connect and Migrate Database
db
  .sync()
  .then(() => {
    logger.log('info', 'DB Connection has been established');
    app.listen(PORT, null, null, () => {
      app.emit('dbConnected');
      // const job = new CronJob('0 0 * * *', wipeDbTrash);
      // job.start();
    });
  })
  .catch(err => {
    logger.error('error', 'DB CONN:', err);
  });

export default app;
