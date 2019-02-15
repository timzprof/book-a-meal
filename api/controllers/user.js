import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';
import secret from '../util/jwt_secret';

class UserController {
  static async registerUser(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, phone, password: hash });
      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      };
      const jwtToken = jwt.sign({ user: safeUser }, secret, {
        expiresIn: 86400
      });
      return res.status(201).json({
        status: 'success',
        message: 'User Registered',
        token: `Bearer ${jwtToken}`,
        user: safeUser
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }

  static async loginUser(req, res) {
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
      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      };
      const jwtToken = jwt.sign({ user: safeUser }, secret, {
        expiresIn: 86400
      });
      return res.status(200).json({
        status: 'success',
        message: 'User Logged In',
        token: `Bearer ${jwtToken}`,
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

export default UserController;
