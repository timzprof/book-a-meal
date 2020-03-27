import Sequelize from 'sequelize';
import db from '../util/db';

import Meal from './meals';
import Order from './orders';
import User from './user';

const CateringService = db.define('catering_service', {
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
  menu: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      allowNull: false
  }
});

CateringService.belongsTo(User, {
    as: 'caterer',
    constraints: true,
    onDelete: 'CASCADE'
});

CateringService.hasMany(Order, { constraints: true, onDelete: 'CASCADE' });

export default CateringService;
