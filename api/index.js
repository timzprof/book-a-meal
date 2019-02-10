import express from 'express';
import bodyParser from 'body-parser';
import Routes from './routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', Routes);

app.listen(4000);
