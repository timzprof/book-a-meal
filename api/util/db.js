import Sequelize from 'sequelize';
import { config } from 'dotenv';

config();

if (process.env.NODE_ENV === 'test') {
  process.env.DB_NAME = 'travis';
  process.env.DB_HOST = 'localhost';
  process.env.DB_USER = 'root';
  process.env.DB_PASSWORD = 'password';
  process.env.DB_PORT = 5432;
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  logging: false
});

export default sequelize;
