import '@babel/polyfill';
import path from 'path';
import express from 'express';
import logger from 'morgan';
import favicon from 'express-favicon';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import Routes from './routes';
import sequelize from './util/db';
import swaggerDocument from './swagger.json';

config();

const app = express();

const PORT = process.env.PORT || 7000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(favicon(path.resolve('client/build/favicon.ico')));
app.use(express.static(path.resolve('client')));
app.use(express.static(path.resolve('client/build')));
app.use(express.static(path.resolve('api/images')));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header(
    'Access-Control-Request-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', Routes);

app.get('/', (req, res) => {
  res.sendFile(path.resolve('client/build', 'index.html'));
});

// Connect and Migrate Database
sequelize
  .sync()
  .then(() => {
    console.log('DB Connection has been established');
    app.listen(PORT, null, null, () => {
      app.emit('dbConnected');
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default app;
