import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Caterer from '../models/caterer';
import secret from '../util/jwt_secret';

class CatererController {
  static async registerCaterer(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const caterer = await Caterer.create({ name, email, phone, password: hash });
      const safeCaterer = {
        id: caterer.id,
        name: caterer.name,
        email: caterer.email,
        phone: caterer.phone
      };
      const jwtToken = jwt.sign({ caterer: safeCaterer, isCaterer: true }, secret, {
        expiresIn: 86400
      });
      return res.status(201).json({
        status: 'success',
        message: 'Caterer Registered',
        token: `Bearer ${jwtToken}`,
        caterer: safeCaterer
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }
}

export default CatererController;
