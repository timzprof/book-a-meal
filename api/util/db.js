import Sequelize from 'sequelize';
import { config } from 'dotenv';

config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: console.log,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

export default sequelize;
