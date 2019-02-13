import jwt from 'jsonwebtoken';
import secret from '../util/jwt_secret';

class AuthController {
  static async verifyUserToken(req, res, next) {
    const token = req.headers.authorization.split(' ');
    const jwtToken = token[1];
    if (!jwtToken) {
      return res.status(401).json({
        status: 'error',
        message: 'No Token Provided'
      });
    }
    try {
      const decoded = await jwt.verify(jwtToken, secret);
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
}

export default AuthController;
