import Sequelize from 'sequelize';
import db from '../util/db';
import User from './user';

const Order = db.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  order: {
    type: Sequelize.JSON,
    allowNull: false
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  billing_address: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  delivery_status: {
    type: Sequelize.INTEGER,
    default: 0
  },
  catererId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Order.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

export default Order;
