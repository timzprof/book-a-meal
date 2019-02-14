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
    let response;
    try {
      const { id } = req.params;
      const { name, price, imageUrl } = req.body;
      const meal = new Meal(id, name, price, imageUrl);
      await meal.update();
      response = {
        code: 200,
        body: {
          status: 'success',
          message: 'Meal Option Updated'
        }
      };
    } catch (err) {
      response = {
        code: 500,
        body: {
          status: 'error',
          message: 'Falied to Updated Meal'
        }
      };
    }
    return res.status(response.code).json(response.body);
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
