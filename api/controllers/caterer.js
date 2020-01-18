import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import Caterer from '../models/caterer';

config();

const secret = process.env.JWT_SECRET;

class CatererController {
  static async registerCaterer(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      const cateringService = req.body.catering_service;
      const hash = await bcrypt.hash(password, 10);
      const caterer = await Caterer.create({
        name,
        email,
        phone,
        catering_service: cateringService,
        password: hash
      });
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

  static async loginCaterer(req, res) {
    try {
      const { email, password } = req.body;
      const caterer = await Caterer.findOne({ where: { email } });
      if (!caterer) {
        throw new Error('Caterer with that email does not exist');
      }
      const result = await bcrypt.compare(password, caterer.password);
      if (!result) {
        throw new Error("Password doesn't match our records");
      }
      const safeCaterer = {
        id: caterer.id,
        name: caterer.name,
        email: caterer.email,
        phone: caterer.phone
      };
      const jwtToken = jwt.sign({ caterer: safeCaterer, isCaterer: true }, secret, {
        expiresIn: 86400
      });
      return res.status(200).json({
        status: 'success',
        message: 'Caterer Logged In',
        token: `Bearer ${jwtToken}`,
        user: safeCaterer
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
