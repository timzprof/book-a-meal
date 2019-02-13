import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import Routes from './routes';
import sequelize from './util/db';
import User from './models/user';
import Caterer from './models/caterer';
import Meal from './models/meals';
import Menu from './models/menu';
import Order from './models/orders';

config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/v1', Routes);

User.hasMany(Order, { constraints: true, onDelete: 'CASCADE' });
Order.belongsTo(Caterer, { constraints: true, onDelete: 'CASCADE' });
Meal.belongsTo(Caterer, { constraints: true, onDelete: 'CASCADE' });
Menu.belongsTo(Caterer, { constraints: true, onDelete: 'CASCADE' });

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
