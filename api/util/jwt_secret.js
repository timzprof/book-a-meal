import { config } from 'dotenv';

config();

const secret = process.env.JWT_SECRET;

export default secret;
