/* eslint-disable import/no-cycle */
import Sequelize from 'sequelize';
import sequelize from '../util/db';

import Caterer from './caterer';

const Menu = sequelize.define('menu', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  meals: {
    type: Sequelize.JSON,
    allowNull: false
  },
  createdAt: Sequelize.DATEONLY,
  updatedAt: Sequelize.DATEONLY
});

Menu.belongsTo(Caterer, { constraints: true, onDelete: 'CASCADE' });

export default Menu;
