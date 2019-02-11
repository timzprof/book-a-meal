import Meal from '../models/meals';

class MealController {
  static async addMealOption(req, res) {
    const { name, price, imageUrl } = req.body;
    const meal = new Meal(null, name, price, imageUrl);
    await meal.add();
    return res.status(201).json({
      status: 'success',
      message: 'Meal Option Added'
    });
  }

  static async getMealOptions(req, res) {
    const meals = await Meal.fetchAll();
    return res.status(200).json({
      status: 'success',
      message: 'Meals Retrieved',
      data: meals
    });
  }

  static async updateMealOption(req, res) {
    const { id } = req.params;
    const { name, price, imageUrl } = req.body;
    const meal = new Meal(id, name, price, imageUrl);
    await meal.update();
    return res.status(200).json({
      status: 'success',
      message: 'Meal Option Updated'
    });
  }

  static async deleteMealOption(req, res) {
    const { id } = req.params;
    await Meal.deleteById(id);
    return res.status(200).json({
      status: 'success',
      message: 'Meal Option Deleted'
    });
  }
}

export default MealController;
