import express from 'express';
import Routes from './routes';

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', Routes);

app.listen(PORT);

export default app;
