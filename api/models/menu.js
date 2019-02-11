import fs from 'fs';
import Meal from './meals';

const p = './data/menu.json';

const getMenusFromFile = () => {
  return new Promise(resolve => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        resolve([]);
      } else {
        resolve(JSON.parse(fileContent));
      }
    });
  });
};

class Menu {
  constructor(catererId = 1, date, meals) {
    this.caterer = catererId;
    this.date = date;
    this.meals = meals;
  }

  async add(id, quantity) {
    try {
      const meal = await Meal.fetch(id);
      const menus = await getMenusFromFile();
      const date = new Date();
      this.date = date.toLocaleString('en-us', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
      const allMenus = [...menus];
      const menuIndex = menus.findIndex(menu => Number(menu.caterer) === Number(this.caterer));
      if (menuIndex !== -1) {
        const newMenu = allMenus[menuIndex];
        meal.quantity = quantity;
        newMenu.meals.push(meal);
      } else {
        const newMenu = {};
        newMenu.date = this.date;
        newMenu.caterer = this.caterer;
        meal.quantity = quantity;
        newMenu.meals = [meal];
        allMenus.push(newMenu);
      }
      fs.writeFile(p, JSON.stringify(allMenus), err => {
        if (err) console.log(err);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async fetchAll() {
    try {
      const menus = await getMenusFromFile();
      return menus;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async fetchOneMenu(catererId = 1) {
    try {
      const menus = await getMenusFromFile();
      const menuIndex = menus.findIndex(menu => Number(menu.caterer) === Number(catererId));
      return menus[menuIndex];
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default Menu;
