import Sequelize from 'sequelize';
import db from '../util/db';

import Meal from './meals';

const OrderItem = db.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

OrderItem.belongsTo(Meal, { constraints: true, onDelete: 'CASCADE' });

export default OrderItem;
