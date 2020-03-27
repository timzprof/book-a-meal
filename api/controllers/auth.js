import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import User from '../models/user';
import CateringService from '../models/catering_service';

config();

const secret = process.env.JWT_SECRET;

class AuthController {
  static async decodeToken(req) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error('No Token Provided');
      }
      const jwtToken = token.split(' ')[1];
      return await jwt.verify(jwtToken, secret);
    } catch (error) {
      throw new Error('Invalid Auth Token');
    }
  }

  static async verifyUser(req, res, next) {
    try {
      const decoded = await AuthController.decodeToken(req);
      req.user = decoded.user;
      next();
      return true;
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        message: error.message
      });
    }
  }

  static verifyAdmin(req, res, next) {
    try {
      if(req.user.type !== 'caterer') {
        throw new Error('Unauthorized');
      }
      next();
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        message: error.message
      });
    }
  }

  static async register(req, res) {
    try {
      const { name, email, phone, password, type, catering_service } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, phone, password: hash, type });
      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        type: user.type
      };
      if(type === 'caterer') {
        const cateringService = await CateringService.create({ name: catering_service, menu: [], catererId: user.id});
        safeUser['catering_service'] = { ...cateringService.dataValues };
      }
      const jwtToken = jwt.sign({ user: safeUser }, secret, {
        expiresIn: 86400
      });
      return res.status(201).json({
        status: 'success',
        message: `${type[0].toUpperCase()}${type.substring(1)} Registered`,
        token: jwtToken,
        user: safeUser
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('User with that email does not exist');
      }
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        throw new Error("Password doesn't match our records");
      }
      const {userPassword, ...safeUser} = user.dataValues;
      if(safeUser.type === 'caterer') {
        const cateringService = await CateringService.findOne({where:{ catererId: safeUser.id}});
        safeUser['catering_service'] = { ...cateringService.dataValues };
      }
      const jwtToken = jwt.sign({ user: safeUser }, secret, {
        expiresIn: 86400
      });
      return res.status(200).json({
        status: 'success',
        message: `${user.type[0].toUpperCase()}${user.type.substring(1)} Registered`,
        token: jwtToken,
        user: safeUser
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }
}

export default AuthController;
