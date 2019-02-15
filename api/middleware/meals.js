import Joi from 'joi';

class MealMiddleware {
  static async validateAddMeal(req, res, next) {
    try {
      const schema = {
        name: Joi.string().required(),
        price: Joi.number()
          .min(1)
          .required()
      };
      await Joi.validate(req.body, schema);
      if (req.files === null) {
        throw new Error('Meal Image Required');
      }
      const imageMimes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!imageMimes.includes(req.files.image.mimetype)) {
        throw new Error('Only JPG, JPEG & PNG Images are allowed');
      }
      next();
      return true;
    } catch (err) {
      let message;
      if (err.details !== undefined) {
        message = String(err.details[0].message);
      } else {
        message = String(err.message);
      }
      return res.status(400).json({
        status: 'error',
        message,
        type: 'validation'
      });
    }
  }

  static async validateUpdateMeal(req, res, next) {
    try {
      const schema = {
        name: Joi.string(),
        price: Joi.number().min(1)
      };
      await Joi.validate(req.body, schema);
      if (req.files !== null) {
        const imageMimes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!imageMimes.includes(req.files.image.mimetype)) {
          throw new Error('Only JPG, JPEG & PNG Images are allowed');
        }
      }
      next();
      return true;
    } catch (err) {
      let message;
      if (err.details !== undefined) {
        message = String(err.details[0].message);
      } else {
        message = String(err.message);
      }
      return res.status(400).json({
        status: 'error',
        message,
        type: 'validation'
      });
    }
  }

  static async validateAddMealToMenu(req, res, next) {
    try {
      const schema = {
        mealId: Joi.number().required(),
        quantity: Joi.number()
          .min(1)
          .required()
      };
      await Joi.validate(req.body, schema);
      next();
      return true;
    } catch (err) {
      let message;
      if (err.details !== undefined) {
        message = String(err.details[0].message);
      } else {
        message = String(err.message);
      }
      return res.status(400).json({
        status: 'error',
        message,
        type: 'validation'
      });
    }
  }
}

export default MealMiddleware;
