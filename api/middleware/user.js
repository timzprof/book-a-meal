import Joi from 'joi';

class UserMiddleware {
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
        message: String(err.details[0].message),
        type: 'validation'
      });
    }
  }

  static async validateLogin(req, res, next) {
    try {
      const schema = {
        email: Joi.string()
          .email()
          .required(),
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
        message: String(err.details[0].message),
        type: 'validation'
      });
    }
  }
}

export default UserMiddleware;
