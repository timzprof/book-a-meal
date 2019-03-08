import '@babel/polyfill';
import express from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import Routes from './routes';
import sequelize from './util/db';
import swaggerDocument from './swagger.json';

config();

const app = express();

const PORT = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', Routes);

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
