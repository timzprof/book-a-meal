import express from 'express';
import Routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', Routes);

app.listen(4000);

export default app;
