import fs from 'fs';
import Meal from '../models/meals';

class MealController {
  static async addMealOption(req, res) {
    try {
      const { name, price } = req.body;
      const { image } = req.files;
      const imageUrl = `/api/images/${image.name}`;
      const meal = await Meal.create({ name, price, imageUrl, catererId: req.caterer.id });
      await image.mv(`.${imageUrl}`);
      return res.status(201).json({
        status: 'success',
        message: 'Meal Option Added',
        data: {
          id: meal.id,
          name: meal.name,
          price: meal.price,
          imageUrl: meal.imageUrl
        }
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }

  static async getMealOptions(req, res) {
    try {
      const meals = await Meal.findAll({ where: { catererId: req.caterer.id } });
      return res.status(200).json({
        status: 'success',
        message: 'Meals Retrieved',
        data: meals
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to Retrieve Meals'
      });
    }
  }

  static async updateMealOption(req, res) {
    try {
      const meal = await Meal.findOne({ where: { id: req.params.id } });
      if (!meal) {
        throw new Error(`Meal With ID ${req.params.id} does not exist`);
      }
      const mealUpdate = {
        name: req.body.name ? req.body.name : meal.name,
        price: req.body.price ? req.body.price : meal.price
      };
      if (req.files !== null) {
        const { image } = req.files;
        const imageUrl = `/api/images/${image.name}`;
        fs.unlink(`.${meal.imageUrl}`, err => {
          if (err) throw new Error(err.message);
        });
        mealUpdate.imageUrl = imageUrl;
        await image.mv(`.${imageUrl}`);
      } else {
        mealUpdate.imageUrl = meal.imageUrl;
      }
      const { name, price, imageUrl } = mealUpdate;
      await Meal.update({ name, price, imageUrl }, { where: { id: req.params.id } });
      return res.status(200).json({
        status: 'success',
        message: 'Meal Option Updated'
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }

  static async deleteMealOption(req, res) {
    try {
      const { id } = req.params;
      const meal = await Meal.findOne({ where: { id } });
      fs.unlink(`.${meal.imageUrl}`, err => {
        if (err) throw new Error(err.message);
      });
      await meal.destroy();
      return res.status(200).json({
        status: 'success',
        message: 'Meal Option Deleted'
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }
}

export default MealController;
