import Menu from '../models/menu';

class MenuController {
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

  static async getMenus(req, res) {
    let response;
    try {
      const menus = await Menu.fetchAll();
      response = {
        code: 200,
        body: {
          status: 'success',
          message: 'Menus Retrieved',
          data: menus
        }
      };
    } catch (err) {
      response = {
        code: 500,
        body: {
          status: 'error',
          message: 'Failed to Retrieve Menu',
          error: err.message
        }
      };
    }
    return res.status(response.code).json(response.body);
  }
}

export default MenuController;
