import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
const secret = process.env.JWT_SECRET;

class AuthController {
  static checkForToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No Token Provided'
      });
    }
    const jwtToken = token.split(' ')[1];
    req.jwt = jwtToken;
    next();
    return true;
  }

  static async verifyUserToken(req, res, next) {
    try {
      const decoded = await jwt.verify(req.jwt, secret);
      req.user = decoded.user;
      next();
      return true;
    } catch (err) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid Auth Token'
      });
    }
  }

  static async verifyAdminToken(req, res, next) {
    try {
      const decoded = await jwt.verify(req.jwt, secret);
      if (!decoded.isCaterer) {
        throw new Error('Unauthorized');
      }
      req.caterer = decoded.caterer;
      next();
      return true;
    } catch (err) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized'
      });
    }
  }
}

export default AuthController;
