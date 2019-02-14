import Menu from '../models/menu';

class MenuController {
  static async getMenus(req, res) {
    try {
      const date = new Date();
      const month = `${date.getMonth() + 1}`;
      const today = `${date.getFullYear()}-${month.padStart(2, '0')}-${date.getDate()}`;
      const menus = await Menu.findAll({ where: { createdAt: today } });
      return res.status(200).json({
        status: 'success',
        message: 'Menus Retrieved',
        data: menus
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }

  static async addMealToMenu(req, res) {
    let response;
    const { mealId, quantity } = req.body;
    const menu = new Menu();
    try {
      await menu.add(mealId, quantity);
      response = {
        code: 200,
        body: {
          status: 'success',
          message: 'Meal Added to Menu'
        }
      };
    } catch (err) {
      response = {
        code: 500,
        body: {
          status: 'error',
          message: 'Failed to Add Meal to Menu'
        }
      };
    }
    return res.status(response.code).json(response.body);
  }
}

export default MenuController;
