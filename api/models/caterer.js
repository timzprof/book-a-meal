import Sequelize from 'sequelize';
import sequelize from '../util/db';

import Meal from './meals';
import Order from './orders';

const Caterer = sequelize.define('caterer', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  catering_service: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: Sequelize.DATEONLY,
  updatedAt: Sequelize.DATEONLY
});

Caterer.hasMany(Order, { constraints: true, onDelete: 'CASCADE' });
Caterer.hasMany(Meal, { constraints: true, onDelete: 'CASCADE' });

export default Caterer;
