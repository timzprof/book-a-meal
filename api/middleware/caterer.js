import Joi from 'joi';
import UserMiddleware from './user';

class CatererMiddleware extends UserMiddleware {
  static async validateRegister(req, res, next) {
    try {
      const schema = {
        name: Joi.string().required(),
        email: Joi.string()
          .email()
          .required(),
        phone: Joi.number()
          .min(11)
          .required(),
        catering_service: Joi.string().required(),
        password: Joi.string()
          .min(7)
          .required()
      };
      await Joi.validate(req.body, schema);
      next();
      return true;
    } catch (err) {
      return res.status(400).json({
        status: 'error',
        message: err.details[0].message,
        type: 'validation'
      });
    }
  }
}

export default CatererMiddleware;
