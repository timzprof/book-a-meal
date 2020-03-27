import CateringService from '../models/catering_service';
import Meal from '../models/meals';

class CateringServiceController {
  static async getCatererMenus(req, res) {
    try {
      const cateringServices = await CateringService.findAll();
      return res.status(200).json({
        status: 'success',
        message: 'Catering Menus Retrieved',
        data: cateringServices
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed To Fetch Menus',
        error: error.message
      });
    }
  }

  static async getSingleMenu(req, res) {
    const cateringService = await CateringService.findOne({ where: { catererId: req.user.id } });
    return res.status(200).json({
      status: 'success',
      message: 'Caterer Menu Retrieved',
      data: cateringService
    });
  }

  static async addMealToMenu(req, res) {
    try {
      const { mealId, quantity } = req.body;
      const meal = await Meal.findOne({ where: { id: mealId, catererId: req.user.id } });
      if (!meal) {
        throw new Error(`Meal with that ID Doesn't exist for this caterer`);
      }

      const { createdAt, updatedAt, ...safeMeal } = meal.dataValues;
      const cateringService = await CateringService.findOne({ where: { catererId: req.user.id } });

      let newQuantity = quantity;
      let updatedMenu = [];
      if (cateringService.menu.length === 0) {
        safeMeal.quantity = Number(quantity);
        updatedMenu.push(JSON.stringify(safeMeal));
      } else {
        updatedMenu = cateringService.menu.map(jsonMeal => {
            const meal = JSON.parse(jsonMeal);
            if (meal.id == mealId) {
              meal.quantity += Number(quantity);
              newQuantity = meal.quantity;
            }
            return JSON.stringify(meal);
          });
      }
      const updatedCateringService = await cateringService.update({
        menu: updatedMenu
      });
      await Meal.update({ quantity: newQuantity }, { where: { id: mealId } });

      return res.status(200).json({
        status: 'success',
        message: 'Caterer Menu Updated',
        data: [...updatedCateringService.dataValues.menu]
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }
}

export default CateringServiceController;
