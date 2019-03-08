import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

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
      const decoded = await jwt.verify(jwtToken, secret);
      return decoded;
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

  static async verifyAdmin(req, res, next) {
    try {
      const decoded = await AuthController.decodeToken(req);
      if (!decoded.isCaterer) {
        throw new Error('Unauthorized');
      }
      req.caterer = decoded.caterer;
      next();
      return true;
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        message: error.message
      });
    }
  }
}

export default AuthController;
