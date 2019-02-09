import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin';
import userRoutes from './routes/user';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', adminRoutes);
app.use('/api/v1', userRoutes);

app.listen(4000);
