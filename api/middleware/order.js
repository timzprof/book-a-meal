import Joi from 'joi';

class OrderMiddleware {
  static async validateOrder(req, res, next) {
    try {
      const schema = {
        mealId: Joi.number()
          .min(1)
          .required(),
        quantity: Joi.number()
          .min(1)
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

export default OrderMiddleware;
