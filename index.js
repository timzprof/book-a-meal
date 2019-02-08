import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin';
import userRoutes from './routes/user';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(adminRoutes);
app.use(userRoutes);

app.listen(4000, () => {
  console.log('Server Started');
});
