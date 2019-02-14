import Sequelize from 'sequelize';
import { config } from 'dotenv';

config();

const { DB_NAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  port: DB_PORT,
  host: DB_HOST,
  logging: false
});

export default sequelize;
